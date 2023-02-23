# Schedule Me

Calendly clone for scheduling meetings professionally and efficiently, eliminating the hassle of back-and-forth emails so you can get back to work.

## Prerequisites

- Node.js installed on your system
- A text editor of your choice
- An existing Next.js project

## Steps

1.  Install dependencies
    Run the following command in your terminal to install all the necessary dependencies:

            npm install

2.  Rename `.env.example` to `.env`
    In the root directory of your project

3.  Update `DATABASE_URL`
    In the .env file, replace the DATABASE_URL with the URL for your Postgres database.

4.  Set `NEXTAUTH_URL`
    In the .env file, set the NEXTAUTH_URL to the URL and port for your Next.js app.

5.  Push Prisma migrations
    Run the following command in your terminal to push any Prisma migrations to your database:

            > npx prisma db push

6.  Start the development server
    Run the following command in your terminal to start the development server:

            > npm run dev

7.  Use the app
    You can now use your app at http://localhost:3000.
