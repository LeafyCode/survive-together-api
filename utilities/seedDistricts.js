require("dotenv").config();
const districts = require("./districts.json");
const { client, INSERT_DISTRICT } = require("./apollo");

const seedDistricts = async (countryId) => {
  const districtObjects = [];

  try {
    districts.forEach((district) => {
      const districtData = {
        name: district.name_en,
        countryId,
        sourceId: district.id,
        isoDistrictCode: district.isoDistrictCode,
        district_translations: {
          data: [],
        },
      };

      if (district.name_si) {
        districtData.district_translations.data.push({
          language: "si",
          text: district.name_si,
        });
      }

      if (district.name_ta) {
        districtData.district_translations.data.push({
          language: "ta",
          text: district.name_ta,
        });
      }

      districtObjects.push(districtData);
    });

    await client.mutate({
      mutation: INSERT_DISTRICT,
      variables: {
        objects: districtObjects,
      },
    });

    console.log(`Added ${districtObjects.length} districts.`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  seedDistricts,
};
