# Near Journey

An open source application built using the new router, server components and everything new in Next.js 13.

## Known Issues

A list of things not working right now:

1. GitHub authentication (use email)
2. [Prisma: Error: ENOENT: no such file or directory, open '/var/task/.next/server/chunks/schema.prisma'](https://github.com/prisma/prisma/issues/16117)
3. [Next.js 13: Client side navigation does not update head](https://github.com/vercel/next.js/issues/42414)

## Running Locally

1. Install dependencies using Yarn:

```sh
yarn
```

2. Copy `.env.example` to `.env.local` and update the variables.

3. Start the development server:

```sh
yarn dev
```

## License

Licensed under the [MIT license](https://github.com/reflexjs/reflex/blob/master/LICENSE).
