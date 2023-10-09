<h1 align="center">Opensurvey</h1>

<h2 align="center">The open-source form builder for everyone</h2>

<div align="center">
The ultimate service for creating multiple forms in record time
</div>

<br>
<br>

<div align="center">
<img width="400" alt="notification-center-912bb96e009fb3a69bafec23bcde00b0" src="public/home-image.png" height="663">
</div>

## Demo

[OpenSurvey Demo](https://opensurvey.vercel.app/)

Our SaaS is in beta. It may contain bugs and is best suited for small projects. Critical processes are discouraged, and demo data may be erased.

## ⭐️ Why OpenSurvey?

OpenSurvey, the open-source alternative to Google Docs and Typeform empowers users to craft short-answer and multiple-choice questions effortlessly. Its simplicity and speed are unmatched. Plus, for those seeking privacy and control, it offers a self-hosting option. Choose OpenSurvey for elegant, transparent, efficient survey creation.

## ☁️ Self Host

Currently I'm hosting the demo in Vercel for hosting the Nextjs App and Supabase for the PostgreSQL database.
I decided to use this platsforms because both give free trial plans. So everyone can host their own
opensurvey for free 🤑.

In vercel I got 4 enviroments variables

For the first two check this guide: [Supabase guide to connect prisma](https://supabase.com/partners/integrations/prisma)

Actually, we use DATABASE_URL and DIRECT_URL because Vercel use serverless. But you can adapt the code to just use DATABASE_URL if you host nextjs in a not serverless enviroment like [Render](https://render.com/). For more info check [Prisma Docs](https://www.prisma.io/docs/concepts/database-connectors/postgresql)

For more info about the nextauth enviroments check [NextAuth Docs](https://next-auth.js.org/configuration/options)

- DATABASE_URL
- DIRECT_URL
- NEXTAUTH_URL: opensurvey.vercel.app
- NEXTAUTH_SECRET: very-secret-password

I will try to create a docker image in the future 🙂

## 🚀 Have a feature request?

For new feature requests, create an issue explaining what you want and why you need it.

## 💻 Need Help?

If you need help, please post your questions in the 'issues' section of the repository.

## Development commands

## Prisma

### Update db

npx prisma db push
npx prisma generate

### db migrate

npx prisma migrate dev --name init

### run seeds

npx prisma db seed

### Prisma Studio

npx prisma studio

### Prisma reset database

npx prisma migrate reset
