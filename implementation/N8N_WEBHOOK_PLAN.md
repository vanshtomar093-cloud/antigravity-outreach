# N8N Webhook Integration Plan

This plan outlines the steps to connect the "Inquiry" and "Valuation" forms to an n8n workflow using a secure webhook.

## 1. Environment Configuration
- [ ] Create/Update `.env.local` with the variable `N8N_WEBHOOK_URL`.
- [ ] Ensure the URL is kept server-side to prevent exposure in the browser.

## 2. GDPR Compliance
- [ ] Update `ContactSection.tsx` and `ValuationModal.tsx` to include a required GDPR compliance checkbox.
- [ ] Copy: "I consent to The Jenkins Group storing my information to contact me regarding my inquiry."

## 3. Server-Side API Route (CORS Bypass)
- [ ] Create `src/app/api/contact/route.ts` using Next.js Route Handlers.
- [ ] Implement a POST method that:
    - Validates incoming data (Name, Email, Message, etc.).
    - Forwards the payload to the `N8N_WEBHOOK_URL` using `fetch`.
    - Returns a success/error response to the frontend.

## 4. Frontend Integration
- [ ] Update `ContactSection.tsx` `handleSubmit`:
    - Collect form data.
    - Send request to `/api/contact`.
    - Handle loading and success/error states.
- [ ] (Optional) Update `ValuationModal.tsx` to also send data to n8n if required.

## 5. Security & Validation
- [ ] Implement basic server-side validation for email format and required fields.
- [ ] Use `process.env.N8N_WEBHOOK_URL` only within the API route.

## 6. Testing
- [ ] Verify form submission triggers the API route.
- [ ] Verify the API route successfully reaches the n8n webhook (requires dummy webhook for testing).
