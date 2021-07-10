# Description

This is a backend project (trello clone) on [Nest](https://github.com/nestjs/nest) framework for [RS School](https://rs.school/).

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [install](https://docs.docker.com/engine/install/)

## Downloading

```
git clone https://github.com/AYaki-coder/node-js-RS2021Q2.git
```

## Installing NPM modules

```
npm install
```

## Running the app
 **to connect to your Postgres database use your credentials in .env**

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```
## Running the app in Docker
Unfortunately I still can't run tests when database and app running in Docker. U can run only database in docker.

## Starting database
```
docker-compose up -d
```
## Running application

```
npm run start:dev
```
## Test

```bash
# e2e tests
npm run test:auth
```
