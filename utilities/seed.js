const { seedCountry } = require("./seedCountry");
const { seedDistricts } = require("./seedDistricts");
const { seedCities } = require("./seedCities");

const seed = async () => {
  const countryId = await seedCountry();
  await seedDistricts(countryId);
  await seedCities();
};

seed();
