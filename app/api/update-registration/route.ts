import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

export async function POST(request: NextRequest) {
  try {
    const { email, eventId, status, reference } = await request.json()

    // Get Google Sheets client
    const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
    if (!privateKey) {
      throw new Error('Missing credentials')
    }

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(privateKey),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })
    const sheetId = process.env.GOOGLE_SHEET_ID

    // Find the row with this email and eventId
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId!,
      range: 'Sheet1!A:H',
    })

    const rows = response.data.values || []
    let rowIndex = -1

    // Find matching row (skip header row)
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][3] === email && rows[i][1] === eventId) {
        rowIndex = i + 1 // Sheets are 1-indexed
        break
      }
    }

    if (rowIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Registration not found' },
        { status: 404 }
      )
    }

    // Update status column (H) and add payment reference
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId!,
      range: `Sheet1!H${rowIndex}:I${rowIndex}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[status, reference || '']],
      },
    })

    console.log(`✅ Updated registration status to '${status}' for ${email}`)

    return NextResponse.json({
      success: true,
      message: 'Registration updated',
    })
  } catch (error: any) {
    console.error('Error updating registration:', error)
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    )
  }
}