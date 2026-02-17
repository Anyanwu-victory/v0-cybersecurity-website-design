import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

interface RegistrationRequest {
  eventId: string
  fullName: string
  email: string
  phone: string
  company: string
  ticketType: string
}

async function getSheetClient() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  const spreadsheetId = process.env.GOOGLE_SHEET_ID

  if (!clientEmail || !privateKey || !spreadsheetId) {
    throw new Error('Missing required Google Sheets environment variables')
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const sheets = google.sheets({
    version: 'v4',
    auth,
  })

  return { sheets, spreadsheetId }
}

export async function POST(request: NextRequest) {
  try {
    // Validate request body
    const body: RegistrationRequest = await request.json()

    const { eventId, fullName, email, phone, company, ticketType } = body

    // Validate required fields
    if (!eventId || !fullName || !email || !phone || !ticketType) {
      return NextResponse.json(
        {
          error: 'Missing required fields: eventId, fullName, email, phone, ticketType',
        },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Get sheets client
    const { sheets, spreadsheetId } = await getSheetClient()

    // Prepare row data
    const timestamp = new Date().toISOString()
    const values = [[timestamp, eventId, fullName, email, phone, company || '', ticketType]]

    // Append to sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:G',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    })

    console.log('[v0] Registration appended to sheet:', response.data.updates)

    return NextResponse.json(
      {
        message: 'Registration successful',
        updates: response.data.updates,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[v0] Registration error:', error)

    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred'

    return NextResponse.json(
      {
        error: 'Registration failed. Please try again later.',
        details: errorMessage,
      },
      { status: 500 }
    )
  }
}
