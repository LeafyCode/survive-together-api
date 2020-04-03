require("cross-fetch/polyfill");
const ApolloClient = require("apollo-boost").default;
const gql = require("graphql-tag");
require("dotenv").config();

const client = new ApolloClient({
  uri: process.env.HASURA_GRAPHQL_ENDPOINT,
  headers: {
    "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
  },
});

const FIND_DISTRICT = gql`
  query district($where: district_bool_exp) {
    district(where: $where) {
      id
      isoDistrictCode
    }
  }
`;

const INSERT_CITY = gql`
  mutation insert_city($objects: [city_insert_input!]!) {
    insert_city(objects: $objects) {
      affected_rows
    }
  }
`;

const INSERT_DISTRICT = gql`
  mutation insert_district($objects: [district_insert_input!]!) {
    insert_district(objects: $objects) {
      affected_rows
    }
  }
`;

const INSERT_COUNTRY = gql`
  mutation insert_country($objects: [country_insert_input!]!) {
    insert_country(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

module.exports = {
  client,
  FIND_DISTRICT,
  INSERT_CITY,
  INSERT_DISTRICT,
  INSERT_COUNTRY,
};
