require("dotenv").config();
const { client, INSERT_COUNTRY } = require("./apollo");

const seedCountry = async () => {
  try {
    const result = await client.mutate({
      mutation: INSERT_COUNTRY,
      variables: {
        objects: [
          {
            name: "Sri Lanka",
            code: "lk",
          },
        ],
      },
    });

    console.log(`1 country added.`);
    return result.data.insert_country.returning[0].id;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = { seedCountry };
