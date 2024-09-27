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
Prisma
React Form hook
Zod
TS
Tailwind