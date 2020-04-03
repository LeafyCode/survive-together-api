include .env

console:
	hasura console --admin-secret $(HASURA_GRAPHQL_ADMIN_SECRET) --endpoint $(HASURA_ENDPOINT)

migrate:
	hasura migrate apply --admin-secret $(HASURA_GRAPHQL_ADMIN_SECRET) --endpoint $(HASURA_ENDPOINT)

seed:
	yarn seed

dockerup:
	docker-compose up -d

dockerdown:
	docker-compose down