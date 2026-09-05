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

Add the bot to the Telegram channel as an administrator so it can verify membership. Do not expose `FLW_SECRET_KEY`, `TELEGRAM_BOT_TOKEN`, or `SUPABASE_SERVICE_ROLE_KEY` as `NEXT_PUBLIC_` variables.

### Course admin setup

Run `supabase/courses.sql` in the Supabase SQL editor. Set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET` in local or Netlify environment variables. Open `/admin/courses`, unlock it with the admin password, and upload course material. The bucket is private; learners receive a 15-minute signed URL only after verified payment or Telegram membership. This uses a separate admin password and does not use Supabase Auth.
