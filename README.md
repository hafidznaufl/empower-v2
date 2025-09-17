# Empower – Report Sexual Harassment Safely and Anonymously

Empower is a digital platform designed to provide a safe and accessible space for individuals to report incidents of sexual harassment. Built with privacy and security in mind, Empower ensures that every report is treated with the utmost care and confidentiality.

> 🛡️ Empowering survivors. Restoring dignity. Taking action.

---

## 🧰 Tech Stack

This project uses the [T3 Stack](https://create.t3.gg/) for rapid and type-safe development:

- **[Next.js](https://nextjs.org/)** – Server-side rendering and routing.
- **[Prisma](https://prisma.io/)** – Database ORM for scalable data management.
- **[Supabase](https://supabase.com/)** – Authentication, PostgreSQL database, and file storage.
- **[tRPC](https://trpc.io/)** – End-to-end typesafe API communication.
- **[Tailwind CSS](https://tailwindcss.com/)** – Beautiful UI with utility-first styling.
- **[Framer Motion](https://www.framer.com/motion/)** – Fluid animations for interactions.

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/) (LTS version recommended)
- [pnpm](https://pnpm.io/) or `npm`

### Installation

```bash
git clone https://gitlab.com/stt-terpadu-nurul-fikri/dev/empower.git
cd empower
pnpm install # or npm install
```

### Configure Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```env
DATABASE_URL=postgresql://your-db-url
DIRECT_URL=postgresql://your-direct-url
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_ADMIN_EMAILS=admin@example.com
```

### Initialize the Database

```bash
npx prisma migrate dev
# or for quick schema sync:
npx prisma db push
```

### Start the App

```bash
pnpm dev # or npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to access the app.

---

## 🔐 Authentication

Empower uses **Supabase Auth** for secure login and registration.

- Users can log in anonymously or with email/password.
- Admin users are identified using email filtering via `NEXT_PUBLIC_ADMIN_EMAILS`.

---

## 🧾 Reporting & File Upload

- Reports are stored in the `reports` table.
- Evidence files (photos, videos, audio) are securely uploaded to Supabase Storage in the `reports/evidence` folder.
- No personal information is required for submitting a report.

---

## 🛠️ Development Utilities

### Prisma Studio

Explore your database visually:

```bash
npx prisma studio
```

---

## 📦 Deployment

### Deploy on Vercel

```bash
npm install -g vercel
vercel
```

- Set up your environment variables on the [Vercel dashboard](https://vercel.com/dashboard).
- Use Supabase production keys and database URL.

---

## ❤️ Contributing

If you’d like to contribute, please open a pull request or issue. Together we can build a safer and more empowering experience for everyone.

---

## 🙋‍♀️ Learn More

- [Empower (T3 Stack)](https://create.t3.gg/)
- [Supabase Docs](https://supabase.com/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [tRPC Docs](https://trpc.io/docs)

---

## 👤 Author

<div align="center">
  <img src="https://avatars.githubusercontent.com/hafidznaufl?s=100" width="80" style="border-radius: 50%;" />
  <br />
  <a href="https://github.com/hafidznaufl">Hafidz Naufal</a>
</div>