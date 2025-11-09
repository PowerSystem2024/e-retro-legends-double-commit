export const getLocation = async () => {
  try {
    const response = await fetch(
      "https://solid-geolocation.vercel.app/location"
    );
    const location = await response.json();
    const { ip, city, country } = location;

    return { ip, city: city.name, country: country.name };
  } catch (error) {
    console.error(error);
  }
};
