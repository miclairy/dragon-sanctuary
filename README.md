# Client for dragon creation and display

Built with NextJs framework on the app router.

## To run

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Second, set up the dev DB with prisma

```bash
brew services start postgresql
npx prisma db seed
```

you can see the contents of the postgres DB with

```bash
npx prisma studio
```

After making a change to the DB schema with prisma run

```bash
npx prisma db push
```

Dev DB Migrations to track the changes

```bash
npx prisma migrate dev
```

### Husky pre-commit hook not being called ?

Make sure the pre-commit hook is allowed to excute with `chmod ug+x .husky/pre-commit`

Run your git UI application from your terminal to inherit the environment.

## Design decisions

Nextjs

* Learn how App router and server side components work
* Popular
* Could have used Remix but NextJs is more popular and I have used it in other projects

Prisma

* Easy Intergration with vercel
* Abstracts away the database

React Form hook

* no dependencies
* uses html standards
    * formik makes it really difficult to watch form values and it is slow

Zod

Tailwind

* Popular wanted to try
* Wanted a lot of custom CSS
* Drawbacks are messy long styles but other UI libaries are more difficult to customise

Pino for logging

* simplicity and works both on client and server logging