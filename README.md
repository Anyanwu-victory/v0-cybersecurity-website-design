# RTDS Cybersecurity Website

A content-managed cybersecurity website with services, company information, contact forms, and event registration for both free and paid events.

The application uses Sanity as its content source, Google Sheets as the event-registration store, Paystack for paid registrations, and Resend for transactional email. It is built with Next.js 14, React, TypeScript, and Tailwind CSS.

## Main features

- Sanity-managed home, about, contact, services, speakers, and events content
- Dynamic event and service pages
- Free and paid event categories
- Server-authoritative event prices and registration rules
- Paystack checkout and signed webhook verification
- One Google Sheets registration tab per event
- Permanent event IDs and sheet-tab assignments
- Duplicate registration protection per event
- Registration confirmation status page
- Registration and contact email delivery through Resend
- Page-level loading states and a custom 404 page
- Vercel Web Analytics

## Technology stack

| Area | Technology |
| --- | --- |
| Application | Next.js 14 App Router, React 18, TypeScript |
| Styling | Tailwind CSS, Radix UI, Lucide icons, Framer Motion |
| CMS | Sanity Studio and GROQ |
| Payments | Paystack |
| Registration storage | Google Sheets API |
| Email | Resend |
| Hosting | Vercel |
| Analytics | Vercel Web Analytics |

## Application architecture

Sanity is the source of truth for event identity, category, price, currency, registration status, deadline, and assigned Google Sheets tab. Browser-submitted prices or event categories must not be trusted by server workflows.

```text
Sanity
  |-- site, service, contact and event content
  |-- event category, price and registration rules
  `-- permanent event ID and Google Sheets tab name

Next.js application
  |-- public pages and registration forms
  |-- registration and status APIs
  |-- Paystack webhook verification
  `-- email and Google Sheets integrations

External services
  |-- Paystack: paid event checkout and payment confirmation
  |-- Google Sheets: event registration records
  `-- Resend: contact and registration email
```

## Registration workflows

### Free events

1. The visitor opens an active event before its registration deadline.
2. The visitor completes the registration form.
3. The browser sends the form to `POST /api/register`.
4. The API resolves the event from Sanity using its slug.
5. The API confirms that registration is active, the deadline has not passed, and payment is not required.
6. The API checks that the email is not already registered for that event.
7. The registration is appended to the event's assigned Google Sheets tab.
8. A confirmation email is attempted.
9. The visitor is redirected to the server-backed success page.

Free registration rows use:

- Registration Type: `Free`
- Amount: `0`
- Payment Status: `Not Required`
- Payment Reference: blank

### Paid events

1. The visitor completes the same registration form.
2. The form data is temporarily retained in browser session storage.
3. The visitor is redirected to the Paystack checkout page.
4. Paystack processes the payment and returns a browser callback.
5. Paystack separately sends a signed `charge.success` webhook to `POST /api/webhooks/paystack`.
6. The webhook verifies its signature and resolves the event from Sanity using the permanent event ID.
7. The server validates the payment status, amount, currency, event category, and registration metadata.
8. The server prevents duplicate emails and reused payment references.
9. The registration is appended to the assigned Google Sheets tab.
10. A confirmation email is attempted.
11. The success page polls the server until the saved registration can be confirmed.

Paid registration rows use:

- Registration Type: `Paid`
- Amount: the verified Sanity event price
- Payment Status: `Paid`
- Payment Reference: the Paystack reference

> A Paystack success popup or payment receipt confirms the charge, but not the registration. Registration is confirmed only after the server verifies the payment and writes the record to Google Sheets. A customer with an unconfirmed payment must not pay again.

## Google Sheets organization

The application uses one spreadsheet containing:

- `Events`: the permanent event index
- One registration tab per event, normally named with its permanent event ID, such as `EVT-2026-002`
- An optional manually managed `Dashboard` tab

The `Events` tab must already exist. The application creates missing event-registration tabs, writes their headers, freezes the first row, and enables a filter.

### Events index columns

```text
Event ID | Event Name | Event Slug | Tab Name | Category | Price |
Currency | Status | Event Date | Registration Deadline | Created At | Updated At
```

### Event registration columns

```text
Registration ID | Name | Email | Phone | Profession | Company |
Registration Type | Amount | Currency | Payment Status |
Payment Reference | Registered At
```

The Google service-account email must have Editor access to the spreadsheet.

## Sanity event requirements

Every published event requires:

- `title`
- `slug`
- `date`
- `registrationDeadline`
- `eventCategory`: `free` or `paid`
- `eventId`: a unique permanent ID such as `EVT-2026-002`
- `sheetTabName`: a unique permanent tab name, normally matching `eventId`
- `registrationStatus`: `draft`, `active`, `closed`, or `archived`

Paid events additionally require:

- A positive numeric `price` in the main currency unit
- A supported `currency`, currently `NGN`, `USD`, or `GHS`

Free events do not require a price or currency. Do not change `eventId` or `sheetTabName` after registrations have begun.

Registration is open only when `registrationStatus` is `active` and the registration deadline has not passed.

## API routes

| Route | Method | Purpose |
| --- | --- | --- |
| `/api/contact` | `POST` | Validates the contact form, notifies the administrator, and sends an auto-reply |
| `/api/register` | `POST` | Validates and records free-event registrations |
| `/api/webhooks/paystack` | `POST` | Verifies Paystack events and records successful paid registrations |
| `/api/registrations/[id]?event=[eventId]` | `GET` | Returns server-confirmed registration status for the success page |

The registration status endpoint returns `202 Processing` while a paid registration is waiting for its webhook-created Google Sheets row.

## Local development

### Prerequisites

- Node.js 20 or a compatible current LTS release
- pnpm
- A Sanity project and dataset
- A Paystack account
- A Google Cloud service account with the Google Sheets API enabled
- A Google spreadsheet shared with that service account
- A Resend account for email delivery

### Install dependencies

```bash
pnpm install
```

### Configure environment variables

Create `.env.local` in the project root. Use real values locally, but never commit the file or paste its contents into documentation, issues, screenshots, or chat messages.

```dotenv
# Public Sanity settings; these values are included in the browser bundle.
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=YYYY-MM-DD

# Contact and registration email delivery.
ADMIN_EMAIL=admin@example.com
RESEND_API_KEY=re_your_key

# Paystack keys must belong to the same account and test/live mode.
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_your_key
PAYSTACK_SECRET_KEY=sk_test_your_key

# Google Sheets service-account JSON must remain on one environment-variable value.
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"your-project","private_key":"-----BEGIN PRIVATE KEY-----\\nREDACTED\\n-----END PRIVATE KEY-----\\n","client_email":"service-account@your-project.iam.gserviceaccount.com"}
GOOGLE_SHEET_ID=your-spreadsheet-id
```

Variables prefixed with `NEXT_PUBLIC_` are intentionally available to the browser and must never contain secrets. `PAYSTACK_SECRET_KEY`, `RESEND_API_KEY`, and `GOOGLE_SERVICE_ACCOUNT_KEY` are server-only secrets.

After adding or changing environment variables, restart the development server.

### Start the application

```bash
pnpm dev
```

Open:

- Website: `http://localhost:3000`
- Sanity Studio: `http://localhost:3000/studio`

### Available commands

```bash
pnpm dev      # Start the development server
pnpm lint     # Run ESLint
pnpm build    # Create a production build
pnpm start    # Run the production build
```

## Testing Paystack webhooks locally

Paystack cannot send webhooks directly to `localhost`. Use a public HTTPS tunnel, for example:

```bash
ngrok http 3000
```

Set the Paystack webhook URL to:

```text
https://your-public-tunnel.example/api/webhooks/paystack
```

Keep both the Next.js development server and the tunnel running during the payment test. In production, replace the tunnel URL with the deployed application URL:

```text
https://your-domain.example/api/webhooks/paystack
```

After a test payment, verify all of the following:

1. Paystack reports a successful transaction.
2. Paystack delivers a `charge.success` event to the webhook URL.
3. The webhook returns HTTP `200`.
4. The event-specific Google Sheets tab contains the registration.
5. The registration status endpoint returns HTTP `200`, not `202`.
6. The confirmation page displays the server-confirmed record.

## Deployment

The application is designed for Vercel deployment.

1. Import the repository into Vercel.
2. Add every required environment variable in the Vercel project settings.
3. Use matching Paystack test keys while testing and matching live keys for production.
4. Deploy the application.
5. Configure Paystack with the deployed HTTPS webhook URL.
6. Share the production Google spreadsheet with the configured service account.
7. Publish the required Sanity documents and events.
8. Run one free registration and one Paystack test transaction before accepting real registrations.

Environment variables are scoped by Vercel environment. Configure the required values for Preview and Production separately when both environments are used.

## Troubleshooting

### Paid transaction succeeds but registration is not confirmed

- Confirm the webhook URL is public and uses HTTPS.
- Inspect Paystack webhook delivery logs, not only the payment receipt.
- Confirm the webhook returned HTTP `200`.
- Confirm the Paystack public and secret keys use the same test/live mode.
- Verify that Paystack metadata contains the permanent event ID and attendee details.
- Confirm the event ID exists in Sanity.
- Confirm the event is `paid` and its Sanity price and currency exactly match the transaction.
- Confirm the Sanity event has a valid `sheetTabName`.
- Confirm the service account can edit the spreadsheet.
- Do not ask the attendee to pay again; retain the Paystack reference for reconciliation.

### Registration endpoint returns `202 Processing`

The registration row has not yet been found. For paid events, this usually means the webhook is delayed, unreachable, rejected, or failed before completing the Google Sheets append.

### Free registration is closed

Confirm in Sanity that:

- `registrationStatus` is exactly `active`.
- `registrationDeadline` is still in the future.
- `eventCategory` is exactly `free`.
- `eventId` and `sheetTabName` are populated.

### Google Sheets write fails

- Confirm `GOOGLE_SERVICE_ACCOUNT_KEY` is valid JSON.
- Confirm `GOOGLE_SHEET_ID` contains the spreadsheet ID, not the full URL.
- Confirm the Google Sheets API is enabled.
- Share the spreadsheet with the service account's `client_email` as an Editor.
- Ensure the permanent `Events` tab exists.
- Ensure Sanity's assigned sheet tab name matches the intended event.

### Email is not delivered

- Confirm `RESEND_API_KEY` is configured.
- Verify a sending domain in Resend for production delivery.
- Replace the development `onboarding@resend.dev` sender with an address on the verified domain.
- Confirm `ADMIN_EMAIL` is valid.

### PostHog requests show `ERR_BLOCKED_BY_CLIENT`

This normally means a browser privacy extension blocked analytics used by a third-party script. It does not by itself indicate a payment, webhook, or registration failure.

## Security guidance

- Never commit `.env.local` or copy its real contents into the README.
- Rotate any secret that has been exposed publicly.
- Keep Paystack secret keys and Google service-account credentials on the server.
- Treat browser payment callbacks as informational; verify payments server-side.
- Verify every Paystack webhook signature before processing it.
- Resolve event category, amount, currency, status, and tab name from Sanity on the server.
- Make webhook handling idempotent so repeated delivery does not duplicate registrations.
- Avoid logging personal registration data or secret environment variables.
- Use separate Paystack test and live credentials and never mix their modes.

## Important project files

| File | Responsibility |
| --- | --- |
| `sanity/schemaTypes/eventType.ts` | Event fields, free/paid rules, stable IDs, prices, status, and deadlines |
| `lib/sanity.ts` | Public Sanity content queries and event normalization |
| `lib/event-record.ts` | Server-side event resolution and registration availability checks |
| `lib/event-registration.ts` | Event pricing rules and registration email delivery |
| `lib/google-sheets.ts` | Event tabs, index synchronization, duplicate checks, reads, and appends |
| `components/form/EventRegistrationForm.tsx` | Shared free/paid registration form and routing decision |
| `app/events/register/checkout/checkout-content.tsx` | Paystack checkout configuration and callback handling |
| `app/api/register/route.ts` | Free-registration API |
| `app/api/webhooks/paystack/route.ts` | Paid-registration webhook API |
| `app/api/registrations/[id]/route.ts` | Server-backed registration confirmation API |
| `app/events/register/success/page.tsx` | Registration confirmation and webhook polling UI |
| `app/api/contact/route.ts` | Contact email API |
| `app/not-found.tsx` | Custom 404 page |
| `components/Loader.tsx` | Shared circular page loader |

## Current operational considerations

- Paid registration currently depends on successful Paystack webhook delivery before it appears in Google Sheets.
- The success page polls for a limited period and then displays an unconfirmed-payment message.
- A secure server-side Paystack reconciliation fallback is recommended for successful payments whose webhook was missed or delayed.
- Google Sheets is appropriate for the current administration workflow, but a transactional database should be considered if registration volume, reporting, refunds, or concurrent processing requirements grow substantially.

## License

This repository is private. Add an explicit license before distributing or open-sourcing the project.
