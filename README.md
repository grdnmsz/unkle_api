## API Test - Unkle

This API is a development state, it can be improved and hopefully I would happy to talk about it!
You will find in this README instructions for setting up the API.

### Requirements
Both Docker and docker-compose have to be installed on your local machine.

## Getting started
- Clone this repository
```
git clone https://github.com/grdnmsz/unkle_api.git
```
- Build, fetch and run docker containers (postgres and this nodejs server):
```
docker-compose up -d
```

### Creates models and seeds the database
- Once your containers are running, it's now time to seed the database with actual datas from `prisma/seed.js`.
- You could not do this more than once since some table keys are unique.
Type the following in your terminal: 
```
> docker-compose exec server /bin/sh

> npx prisma migrate dev --name init && npx prisma db seed --preview-feature
```

That's it! You're all set. For further information about the API itself, please go [there](https://documenter.getpostman.com/view/13245077/TzJsfxoZ)

### License
This project is under 0BSD, feel free to use and share it!

### Tech and frameworks used
- [Docker](https://www.docker.com/), an open platform for developing, shipping, and running applications
- [Prisma](https://www.prisma.io/), a new kind of ORM for Node.js and Typescript
- [Express](https://expressjs.com/) a fast unopinionated, minimalist web framework for Node.js
- [PostgreSQL](https://www.postgresql.org/), an open source relational database
