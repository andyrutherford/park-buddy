export const fetchPark = async (parkId) => {
  const url = `https://developer.nps.gov/api/v1/parks?parkCode=${parkId}&api_key=${process.env.REACT_APP_NPS_API_KEY}`;

  try {
    const res = await fetch(url);
    const json = await res.json();
    return json.data[0];
  } catch (error) {
    console.log(error.message);
  }
};
