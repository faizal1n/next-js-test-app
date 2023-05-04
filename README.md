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

## Frontend Routes

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## API Routes

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

Next JS will use only one middleware file (`middleware.js`) for all its matching routes, but the middleware could not be connected with database. If you need middleware that access database, e.g. user permission middleware, third party route handler library is needed. In this case, [next-connect](https://github.com/hoangvvo/next-connect) is used, implemented in `pages/api/user.js`

## Path Alias
We need to import by its relative path of the file, usually, to use our custom library. 
For example if we have a router library `lib/router.js`, and need to be imported in `pages/api/profile.js`, then the import syntax is
```
import * from '../../lib/router.js'
```
If we must import in `pages/api/users/index.js` however, the import syntax become
```
import * from '../../../lib/router.js'
```

NextJS has path alias that could solve the import relative path syntax problem. The alias can be defined in `jsconfig.json` file in root directory

```
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/lib/*": ["library/*"]
    }
  }
}
```
This means we can use `import { createDefaultRouter } from @/lib/router.js` to use functions in `library/router.js`, no matter directory location of file that use it.

NextJS also provides mapping alias of all directory using these code in `jsconfig.json`
```
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## Router Library
Router library (`lib/router.js`) has functions that can generate next-connect router object, complete with error handler
- `createDefaultRouter` : generate next-connect router object without any middlewares


## Database Connection using Sequelize
Sequelize ORM is installed in this project as mysql database connector. If you want other SQL database, please change `DB_DIALECT` in the .env file according to the database and install the database javascript library.

Sequelize directory hierarchy configurations are saved in `.sequelizerc` file.
There are 4 components of Sequelize library in this project:

1. `config.js` file: 
This file contains configuration setting for Sequelize. In this project, `logging` option is set to false. If `logging` option is true, every executed query will appear in terminal log

2. Models directory
Database table models and default connector ( `models/index.js` ) will be put in directory `models`.

3. Migrations directory
Database migration files, for exporting database tables from code, will be located in `database/migrations`

4. Seeders directory
Database seeder files, for generating default data in database tables, are in `database/seeders`


### Database migrations
Sequelize provides migration file when a model created using command line. These command below will create User model and Product Model

```bash
npx sequelize-cli model:create --name users --attributes first_name:string,last_name:string,username:string,password:string,email:string,profile_image:string,is_active:boolean

npx sequelize-cli model:create --name products --attributes name:string,image:string,description:string,price:integer,created_by:integer,is_active:boolean
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

