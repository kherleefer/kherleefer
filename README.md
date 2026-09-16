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
AI_PROVIDER=gemini            # force the preferred provider (gemini | groq | cerebras | cloudflare)
AI_MODEL=                     # override the model for the chosen provider
AI_GEMINI_MODEL=gemini-3.6-flash
AI_GROQ_MODEL=meta-llama/llama-3.3-70b-instruct
AI_CEREBRAS_MODEL=llama3.3-70b
AI_CLOUDFLARE_MODEL=@cf/meta/llama-3.1-8b-instruct
AI_TIMEOUT_MS=45000           # how long a provider may take before falling back (default 45s)
```

Requests are rate-limited to **10 questions per 15 minutes per IP** (in-memory sliding window in `POST /api/courses/[slug]/ai`), which is a soft per-instance guard. The assistant **tries every configured provider in priority order** (Gemini → Groq → Cerebras → Cloudflare) with a 20s timeout each, so one provider being down or blocked falls back to the next available one. If every provider fails, the exact reason is logged server-side and shown in the chat. When no provider key is set, the chat shows a friendly "not configured yet" message instead of failing.

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
