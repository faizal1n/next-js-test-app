## Prerequisites
1. Install [Node JS](https://nodejs.org/en/download) v14.18.0 or newer
2. Install required packages
```bash
npm install
``` 

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## API Routes

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

Next JS will use only one middleware file (`middleware.js`) for all its matching routes, but the middleware could not be connected with database. If you need middleware that access database, e.g. user permission middleware, third party route handler library is needed. In this case, [next-connect](https://github.com/hoangvvo/next-connect), implemented in `pages/api/profile.js`


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

