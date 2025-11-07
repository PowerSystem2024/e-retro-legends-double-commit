export const getLocation = async () => {
  try {
    const response = await fetch(
      "https://solid-geolocation.vercel.app/location"
    );
    const location = await response.json();
    const { ip, city, country } = location;
    const timeZone = country.timeZone;
    const state = timeZone.replace(/^([^/]+\/){2}/, "") || null;

    return { ip, city: city.name, country: country.name, state };
  } catch (error) {
    console.error(error);
  }
};
