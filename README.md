# API Test - Unkle

This API is a development version, it can be improved and hopefully we will be exchanging about it !
You will find in this README instructions for installing the API.

### Requirements
Both Docker and docker-compose have to be installed on your local machine.

## Getting started
- Clone this repository
```
git clone https://github.com/grdnmsz/unkle_api.git
```
- Build & fetch docker images (postgres and this nodejs server):
```
docker-compose up -d
```

### Creates models and seed the database
- Once your images are running, it's now time to seed the database with actual datas from `prisma/seed.js`.
- You could not do this more than once since some table keys are unique.
Type the following in your terminal: 
```
docker-compose exec server /bin/sh
npx prisma migrate dev --name init && npx prisma db seed --preview-feature
```

That's it ! You're all set. For further information about the API itself, please go [there](https://documenter.getpostman.com/view/13245077/TzJsfxoZ)