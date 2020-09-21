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

export const fetchRandomPark = async (n) => {
  const random = Math.floor(Math.random() * 497) + 1;  
  const url = `https://developer.nps.gov/api/v1/parks?start=${random}&limit=1&api_key=${process.env.REACT_APP_NPS_API_KEY}`;
  let error;
  try {
    const res = await fetch(url);
    const json = await res.json();
    if (json.data[0].images.length < 1) {
      console.log(`No images found for parkId ${random}.  Trying a different park`);
      throw error;
    }
    return {
      address: json.data[0].addresses[0].city + ', ' + json.data[0].addresses[0].stateCode,
      parkCode: json.data[0].parkCode,
      name: json.data[0].fullName,
      images: json.data[0].images
    };
  } catch (error) {
    if (n === 1) throw error;
    return await fetchRandomPark(n - 1);
  }
}

export const fetchSearchParks = async (query) => {
  const limit = 16;
  const url = `https://developer.nps.gov/api/v1/parks?limit=${limit}&q=${query}&start=0&api_key=${process.env.REACT_APP_NPS_API_KEY}`;
  try {
    const res = await fetch(url);
    const json = await res.json();
    if (json.total === 0) {
      console.log('No results found.');
      return 'No results found.  Please try searching for something else.'
    }
    return json;
  } catch (error) {
    console.log(error.message);
  }
}
