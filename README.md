# API Test - Unkle

This API is a developtment version, it can be improved and we hopefully will be discussing about it !
You will find in this README instructions for installing the API.

### Requirements
You will need docker and docker-compose to run on your local machine.

## Getting started
- Clone this repository
- Build & fetch docker images (postgres and this nodejs server)

```
docker-compose up -d
```

### Creates models and seeding database
- Once your images are running, it's now time to seed the database with actual datas from `prisma/seed.js`.
- You could not do this more than once since some table keys are unique.
Type the following in your terminal: 
```
docker-compose exec server /bin/sh
npx prisma migrate dev --name init && npx prisma db seed --preview-feature
```

That's it ! You're all set. For further information about the API itself, please go [there](https://documenter.getpostman.com/view/13245077/TzJsfxoZ)