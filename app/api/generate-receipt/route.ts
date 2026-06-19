import { NextRequest, NextResponse } from 'next/server'
import { jsPDF } from 'jspdf'

export async function POST(request: NextRequest) {
  try {
    const { email, eventTitle, amount, reference, fullName } = await request.json()

    // Create PDF receipt
    const doc = new jsPDF()

    // Header
    doc.setFontSize(20)
    doc.text('Payment Receipt', 105, 20, { align: 'center' })

    // Details
    doc.setFontSize(12)
    doc.text(`Event: ${eventTitle}`, 20, 40)
    doc.text(`Name: ${fullName}`, 20, 50)
    doc.text(`Email: ${email}`, 20, 60)
    doc.text(`Amount: ₦${amount}`, 20, 70)
    doc.text(`Reference: ${reference}`, 20, 80)
    doc.text(`Date: ${new Date().toLocaleString()}`, 20, 90)

    // Generate PDF as base64
    const pdfBase64 = doc.output('datauristring')

    return NextResponse.json({ success: true, pdf: pdfBase64 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate receipt' }, { status: 500 })
  }
}