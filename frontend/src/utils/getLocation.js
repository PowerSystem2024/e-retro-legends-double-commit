export const getLocation = async () => {
  const response = await fetch("https://solid-geolocation.vercel.app/location");
  const location = await response.json();
  const { ip, city, country } = location;
  const timeZone = country.timeZone;
  const state = timeZone.replace(/^([^/]+\/){2}/, "");
  
  return { ip, city: city.name, country: country.name, state };
};
