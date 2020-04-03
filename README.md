# SurviveTogether.org (API)

This website is free for everyone to use. Please do not abuse it's capabilities. Currently, some areas get all the required items. There are deliveries, mobile stores, online stores, etc. But for some areas there's nothing. The main target of this website is to identify such areas and make sure everyone survives this crisis together. Learn more on our [About Us](https://survivetogether.org/about) page.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- [NodeJS](https://nodejs.org/en/)
- [Yarn (Please only use yarn)](https://classic.yarnpkg.com/en/docs/install)
- [Docker](https://docs.docker.com/install/)
- [Docker compose](https://docs.docker.com/compose/install/)
- [Hasura CLI](https://hasura.io/docs/1.0/graphql/manual/hasura-cli/index.html)

### Installing

- First create a `.env` in the project root and paste the content of the `.sample_env` file into it. You may change whatever you want but the default are fine for development.
- Next, run the docker compose and up the database and Hasura console using the following command:

```shell script
make dockerup
```
*Remember to run `make dockerdown` when you are done.*

- Now apply the migrations:

```shell script
make migrate
```

- And seed the database:

```shell script
make seed
```

- Finally, navigate to [http://localhost:8080](http://localhost:8080) (Hasura Console) > Settings (Cog wheel on the top right corner) > Allowed Queries and upload the `allow-list.graphql` located in the root of the project. 
- Now you can play around the database using the Hasura Console ([http://localhost:8080](http://localhost:8080)).

### And coding style tests

Make sure your editor supports `eslint` and all the files you submit are properly formatted according to the eslint rules.


## Built With

* [Hasura](https://hasura.io/) - Hasura is an open source engine that connects to your databases & microservices and auto-generates a production-ready GraphQL backend.
* [PostgreSQL](https://www.postgresql.org/) - The database.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Leafy Team** - *Initial work* - [LeafyCode](https://leafycode.com/)

See also the list of [contributors](https://github.com/LeafyCode/survive-together-api/contributors) who participated in this project.

## License

This project is licensed under the **GPL-3.0** License. This project should not be used by anyone for any profit. It's built to help people.

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc

