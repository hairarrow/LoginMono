# Sample "Login" MonoRepo

A full working server and client using: **NodeJS, Express, PostgreSQL, GraphQL, TypeScript, Apollo-Server, GraphQL Code Generator, GraphQL Modules, and Jest**. I'm also using **Lerna** to manage dependencies and be able to run both projects in parallel.

## Setup

Bootstrap each project by running from the root directory:

```
$ npm install
```

Install PostgreSQL and initialize a database:

- With Docker

```
$ docker run --name login-postgres -e POSTGRES_DB=login -e POSTGRES_USER=testuser -e POSTGRES_PASSWORD=testpassword --rm -p5432:5432 postgres
```

- With Brew

```
$ brew install postgresql
$ initdb /usr/local/var/postgres
$ pg_ctl -D /usr/local/var/postgres start (or stop)
```

```
$ psql postgres
# create database login;
# create user testuser with encrypted password 'testpassword'
```

You can either run each project individually or from the root:

```
$ cd apps/[api | frontend] && npm start

OR

$ npm run apps:start
```

## Global Scripts

_These should be run from the root of the directory._

### `$ npm install`

Will bootstrap each project

### `$ npm run [test | format | start | build]:apps`

Will run the script for each module in the `./apps` directory. **Each module should include these commands.**

## TODO

- Add tslint
- Single tsconfig, tslint
- Visual regression testing
- "packages" directory for shared libraries \
- "components" directory for shared components
- Storybook components
