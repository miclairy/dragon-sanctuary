# Client for dragon creation and display

Built with NextJs framework on the app router.

## To run

First: Copy the env.example to .env and adjust the postgres url to your one. Add the values for open ai and aws

Second: Run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Third: set up the dev DB with prisma

```bash
brew services start postgresql
npx prisma db seed
```

Something to fix soon is to fix snaplet so that the index is sequential autoincrement.
For now go ahead and open prisma studio and fix the indices so that they are 1,2,3...
You may also like to change the all the image keys to img-hk6W3YFem90GyKIy82eFDAD3.
You can see the contents of the postgres DB with

```bash
npx prisma studio
```

After making a change to the DB schema with prisma run

```bash
npx prisma db push
```

Dev DB Migrations to track the changes

```bash
npm run migrate
```

## OpenAI usage

Take care with generating images in dev. By default, it will not call openAI as this cost money.
Changing your node env to production or test will enable this.

### Husky pre-commit hook not being called ?

Make sure the pre-commit hook is allowed to execute with `chmod ug+x .husky/pre-commit`

Run your git UI application from your terminal to inherit the environment.

## Design decisions

Nextjs

* Learn how App router and server side components work
* Already use this at work, so it makes sense to learn the new and improved features.
* Alternatives: Remix
* I do think that the dev server is slower and might look into using turbopack

Prisma for ORM

* Easy Integration with vercel
* Abstracts away the database and easy typescript integration

React Form hook

* no dependencies so small bundle
* minimizes re-renders
* formik is slow and large for an uncomplicated form like this

Zod for serverside validation

* as yet to implement but it supports typescript better than yup

Tailwind for CSS

* Popular wanted to try
* Wanted a lot of custom CSS
* Drawbacks are messy long styles but other UI libaries are more difficult to customise
* NB: Vercel's V0 will generate UI components with tailwind by default

Pino for logging

* simplicity and works both on client and server logging

Jest for testing
