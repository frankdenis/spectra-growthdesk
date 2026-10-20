# Spectra GrowthDesk — Product Blueprint

## Brand

- Name: Spectra GrowthDesk
- Tagline: Grow louder. Grow smarter.
- Primary gradient: #7C3AED to #2563EB
- Background: #0B1220
- Text: #0F172A
- Accent: #22D3EE

## Website metadata

- Website title: Spectra GrowthDesk — AI Social Media Growth Platform
- Website description: Spectra GrowthDesk is a premium AI-powered social media management platform that helps agencies and brands create, approve, schedule, publish, and measure high-performing content from one branded dashboard.
- App title: Spectra GrowthDesk — Social Growth OS
- App description: Spectra GrowthDesk gives agencies and brands a branded client portal for AI content creation, approvals, scheduling, publishing, analytics, and monthly growth reporting.

## Pricing

| Plan | Price | Includes |
|---|---:|---|
| Starter | $149/month | 12 posts/month, 1–2 platforms, approvals, monthly report |
| Growth | $299/month | 20 posts/month, 2–3 platforms, AI Studio, analytics dashboard |
| Momentum | $599/month | 30 posts/month, 3–4 platforms, campaigns, branded reporting |
| Authority | Custom | Full-service content, video, ads support, priority strategy |

## Client Portal

- Growth Overview
- Content Radar
- Approval Studio
- Spectra AI Studio
- Growth Intelligence
- Momentum Reports
- Brand Core
- Channel Hub

## Admin Control Center

- Command Center
- Client management
- View as Client
- Content queue
- AI configuration
- Publishing queue
- Campaign Engine
- Billing and subscriptions
- Team and roles
- Notifications
- Support tickets
- Audit logs
- System settings

## Data model

- User: id, name, email, role, client_id
- Client: id, business_name, industry, plan, status
- SocialAccount: id, client_id, platform, handle, status
- BrandProfile: client_id, voice, audience, offers, competitors, banned_topics
- Post: id, client_id, platform, caption, media, scheduled_at, status
- Campaign: id, client_id, name, goal, start_date, end_date, budget
- Report: id, client_id, period, metrics, summary
- AdminAction: id, admin_user_id, client_id, action, timestamp

## AI prompt system

1. Brand profile analysis
2. Monthly content calendar
3. Single post caption
4. Reel or video script
5. Carousel content
6. Client approval summary
7. Monthly performance report

## Production integrations

- Database: PostgreSQL, Supabase, or PlanetScale
- Authentication: Supabase Auth, Clerk, Auth.js, or Firebase Auth
- AI: OpenAI, Anthropic, or Google Gemini
- Social publishing: Ayrshare, Upload-Post, Buffer API, or official platform APIs
- Payments: Stripe, Paystack, or Flutterwave
- Background jobs: Inngest, Trigger.dev, or Redis/BullMQ

## Security rules

- Clients can access only their own workspace.
- Admin access is role-based.
- Every admin action is written to the audit log.
- Social publishing requires explicit client approval unless auto-publish is enabled.
- API keys, OAuth tokens, and payment credentials must be stored in server-side environment variables.