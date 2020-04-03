const cities = require("./cities.json");
const { client, FIND_DISTRICT, INSERT_CITY } = require("./apollo");

const seedCities = async () => {
  const cityObjects = [];

  const districtData = await client.query({
    query: FIND_DISTRICT,
  });

  await Promise.all(
    // Map through all the cities
    cities.map(async (city) => {
      // Get the city district iso code
      const isoDistrictCode = city["admin2 code"]
        ? parseInt(city["admin2 code"], 10)
        : null;

      // Check for duplicates since the data set can have duplicates
      const cityDuplicate = cityObjects.find((dupCity) => {
        return (
          city.geonameid !== dupCity.sourceId &&
          city.name === dupCity.name &&
          dupCity.isoDistrictCode === isoDistrictCode
        );
      });

      // Get the district from the db
      const district = districtData.data.district.find(
        (districtItem) => districtItem.isoDistrictCode === city["admin2 code"]
      );

      const districtId = district ? district.id : null;

      // Add city only if there are no duplicates and if it have a district
      if (!cityDuplicate && districtId) {
        const cityData = {
          name: city.name,
          sourceId: city.geonameid,
          districtId,
          isoProvinceCode: parseInt(city["admin1 code"], 10),
          isoDistrictCode,
          location: {
            type: "Point",
            coordinates: [
              parseFloat(city.latitude),
              parseFloat(city.longitude),
            ],
          },
        };

        cityObjects.push(cityData);
      }
    })
  );

  try {
    const cityCount = cityObjects.length;

    // Break the data into chunks since sending such a large amount of data once can break things
    const cityChunks = new Array(Math.ceil(cityObjects.length / 2000))
      .fill()
      .map(() => cityObjects.splice(0, 2000));
    // Write to the db
    await Promise.all(
      await cityChunks.map(async (chunk) => {
        await client.mutate({
          mutation: INSERT_CITY,
          variables: {
            objects: chunk,
          },
        });
      })
    );

    console.log(`Added ${cityCount} cities.`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { seedCities };
