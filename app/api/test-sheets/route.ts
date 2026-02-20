import { NextResponse } from 'next/server'
import { google } from 'googleapis'

export async function GET() {
  try {
    const privateKey = process.env.GOOGLE_PRIVATE_KEY
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL
    const sheetId = process.env.GOOGLE_SHEET_ID

    console.log('Checking environment variables...')
    console.log('GOOGLE_CLIENT_EMAIL:', clientEmail ? '✅ Set' : '❌ Missing')
    console.log('GOOGLE_PRIVATE_KEY:', privateKey ? '✅ Set' : '❌ Missing')
    console.log('GOOGLE_SHEET_ID:', sheetId ? '✅ Set' : '❌ Missing')

    if (!privateKey || !clientEmail || !sheetId) {
      return NextResponse.json({
        error: 'Missing environment variables',
        details: {
          hasPrivateKey: !!privateKey,
          hasClientEmail: !!clientEmail,
          hasSheetId: !!sheetId,
        }
      }, { status: 500 })
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })

    // Try to read the sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'Sheet1!A1:A1',
    })

    return NextResponse.json({
      success: true,
      message: 'Google Sheets connection successful!',
      data: response.data.values,
    })
  } catch (error: any) {
    console.error('Test error:', error)
    return NextResponse.json({
      error: 'Connection failed',
      message: error.message,
      code: error.code,
    }, { status: 500 })
  }
}