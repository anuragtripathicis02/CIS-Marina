# KNOWN LIMITATIONS & EXTERNAL CONFIGURATION REQUIREMENTS

## 1. External Credentials Required for Production

1. **Stripe Webhook Secret**: `STRIPE_WEBHOOK_SECRET` must be set in production to process live payment events.
2. **Twilio / WhatsApp Business SID**: `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN` required for live SMS/WhatsApp message delivery.
3. **OpenAI / AI Provider API Key**: `OPENAI_API_KEY` required for live LLM prompts.
4. **S3 Storage Bucket**: `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` required for live S3 document storage.
5. **IoT Broker Credentials**: `IOT_MQTT_BROKER_URL` required for live hardware telemetry streaming.

---

## 2. Recommended Operational Next Steps
- Conduct legal and regional tax compliance reviews prior to launching live operations in new international jurisdictions (`LEGAL REVIEW RECOMMENDED`).
