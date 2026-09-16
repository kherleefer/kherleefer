# Hi there,

### I'm Kherleefer, Software Engineer with high adolescent personality.

This is my portfolio Branch,
you are in liberty to use it under MIT License.

## About Me

- 🔧 IT Technician specializing in Software Engineering, Cybersecurity, and Data Science as well as Blockchain Technology & Smart Contracts.
- 🛠️ Proficient in Python, JavaScript, Docker, and Tact.
- 🔒 Passionate about securing systems and building robust applications.
- 📊 Enthusiastic about leveraging data to drive insights and solutions.

## Skills

- **Programming Languages:** Python, Kotlin, JavaScript, SQL, Php,FunC & Tact.
- **Cybersecurity Tools:** Wireshark, Metasploit, Burp Suite, penetration testing.
- **Data Science Tools:** Pandas, NumPy, TensorFlow, Tableau
- **DevOps Tools:** Docker, Kubernetes

## Projects

- [Emergency Report system](https://ERP.com): A secure Emergency report application that enable Emergency report to a nearest authority or Hospitals.
- [Real-time language Translation Chat Application](https://): A secure messaging app with end-to-end encryption able to connect the world with real-time language Translation.
- [Data Analysis Dashboard](https://thinker.com): A dashboard for visualizing phishing & Spam email data.
- [Network Vulnerability Scanner](https://): A tool for identifying network vulnerabilities.

## npm Packages

- [@glister/currency-utils](https://www.npmjs.com/package/@glister/currency-utils): Lightweight, tree-shakable currency and number formatting utilities built on the native `Intl` API.
- [@gloxx/gloxx-wasm](https://www.npmjs.com/package/@gloxx/gloxx-wasm): WebAssembly bindings for the Gloxx Network — high-performance cryptographic operations and wallet management for interacting with the Gloxx blockchain.

## Education

- **Kaduna City University:** Computer Science

## Certifications

### Cisco

- Endpoint Security
- CyberThreat Management
- Routing & Switching

### IBM

- Data Science
- Data Analysis
- Data visualisation

### KadIct Hub

- Python Programming
- Database Management
- Cybersecurity affiliate 3MTT Ng

## Connect with Me

- LinkedIn: [Mahmud Abubakar](https://www.linkedin.com/in/kherleefer)
- Email: Mahmud mahmudkalifa6@gmail.com
- Portfolio: [kkglistertech.com](https://kkglistertech.com)

![GitHub Stats](https://github-readme-stats.vercel.app/api?username=kherleefer&show_icons=true&theme=dark)

## Course access setup

The `/courses` page supports paid Flutterwave checkout and free access for verified Telegram channel members. Configure these environment variables in your deployment:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.example
NEXT_PUBLIC_TELEGRAM_BOT_USERNAME=your_bot_username
NEXT_PUBLIC_TELEGRAM_CHANNEL_URL=https://t.me/your_channel
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHANNEL_USERNAME=@your_channel
FLW_SECRET_KEY=your_flutterwave_secret_key
```

### AI course assistant

Course detail pages include an interactive **Ask about this course** assistant that helps learners understand the course and get started. It calls one of these providers (auto-detected, in this priority order). Set the API key for any single provider you use:

```env
# Gemini (first choice)
GEMINI_API_KEY=your_gemini_api_key
# OR Groq
GROQ_API_KEY=your_groq_api_key
# OR Cerebras
CEREBRAS_API_KEY=your_cerebras_api_key
# OR Cloudflare Workers AI
CLOUDFLARE_API_TOKEN=your_api_token
CLOUDFLARE_ACCOUNT_ID=your_account_id

# Optional tuning (set any of these to pin exact models for your keys)
AI_PROVIDER=gemini            # prefer this provider; others remain fallbacks
AI_MODEL=                    # legacy override for AI_PROVIDER only; prefer the settings below
AI_GEMINI_MODEL=gemini-3.6-flash
AI_GROQ_MODEL=llama-3.3-70b-versatile
AI_CEREBRAS_MODEL=qwen-3.8-27b
AI_CLOUDFLARE_MODEL=@cf/meta/llama-3.1-8b-instruct
AI_TIMEOUT_MS=45000           # how long a provider may take before falling back (default 45s)
```

Requests are rate-limited to **10 questions per 15 minutes per IP** (in-memory sliding window in `POST /api/courses/[slug]/ai`), which is a soft per-instance guard. The assistant **tries every configured provider in priority order** (Gemini → Groq → Cerebras → Cloudflare), with a configurable fetch timeout of 45s by default per attempt. Network connection timeouts can occur sooner. If every provider fails, errors are logged server-side; the final provider's error is returned to the chat. When no provider key is set, the chat shows a friendly "not configured yet" message instead of failing.

The chat's provider selector changes the first provider attempted, without disabling fallback. Assistant replies render Markdown, and the status badge reports the provider/model that actually answered and the total request latency (including lookup and fallback attempts).

Provider-specific model variables take precedence over the legacy `AI_MODEL`, which applies only to an explicitly selected `AI_PROVIDER`; it is ignored when no valid preference is set. Client model overrides apply only to the client-selected provider. Clear stale overrides when migrating: Groq's retired `llama-3.1-70b-versatile` should be replaced with `llama-3.3-70b-versatile`. The Cerebras default is `qwen-3.8-27b`, using `reasoning_effort=none` for short course answers. Model access still depends on your provider account.

After changing environment variables, restart the development server or redeploy. A Gemini `UND_ERR_CONNECT_TIMEOUT` indicates a connectivity problem, not a model-name error; increasing `AI_TIMEOUT_MS` does not override Node's underlying connection timeout. Cloudflare requires an Account ID (not a Zone ID) and a token with Workers AI permissions. Remove credentials for providers you do not intend to use so fallback does not repeatedly attempt them.

Add the bot to the Telegram channel as an administrator so it can verify membership. Do not expose `FLW_SECRET_KEY`, `TELEGRAM_BOT_TOKEN`, `SUPABASE_SERVICE_ROLE_KEY`, or any AI provider token as `NEXT_PUBLIC_` variables.

### Course admin setup

Run `supabase/courses.sql` in the Supabase SQL editor. Set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET` in local or Netlify environment variables. Open `/admin/courses`, unlock it with the admin password, and upload course material. Choose categories such as `Programming`, `Office & Productivity`, `Data & Analytics`, or `Creative & AI`; the public catalog searches and paginates these records instead of loading every course at once. The bucket is private; learners receive a 15-minute signed URL only after verified payment or Telegram membership. This uses a separate admin password and does not use Supabase Auth.

### Telegram welcome webhook

The bot must be an administrator of the channel. Register the deployed webhook once, replacing the placeholders:

```text
https://api.telegram.org/botYOUR_BOT_TOKEN/setWebhook?url=https://your-domain.example/api/telegram-webhook&allowed_updates=["chat_member"]
```

The webhook welcomes new members. New course announcements are sent automatically when a course is uploaded from `/admin/courses`, using `TELEGRAM_CHANNEL_USERNAME` as the announcement destination.

### Course share links and previews

Every course gets a public page at `/courses/{slug}` with its own Open Graph metadata (shared links show the course title and description on WhatsApp, Telegram, X, etc.). Course cards include a **Preview** button and a **Share** button; the course modal also has a **Preview course** button — both open `/courses/{slug}`, where the material preview lives.

Each course page previews roughly **one sixth of the material** (`GET /api/courses/[slug]/preview`): the server measures the PDF's total pages and serves `ceil(total / 6)` first pages via a response header (`X-Preview-Pages`) so the UI can say exactly how many pages are being previewed. Only those extracted pages are served — the private bucket file is never exposed. Preview works for PDF materials; other formats show a fallback message. The full material still requires verified payment or Telegram membership (15-minute signed URL). The `pdf-lib` dependency performs the page extraction on the server.
