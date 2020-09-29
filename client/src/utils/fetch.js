export const fetchParks = async (parkIds) => {
  const url = `https://developer.nps.gov/api/v1/parks?parkCode=${parkIds}&api_key=${process.env.REACT_APP_NPS_API_KEY}`;

  try {
    const res = await fetch(url);
    const json = await res.json();
    const data = json.data.map((i) => ({
      name: i.name,
      parkCode: i.parkCode,
      img: i.images.length > 0 ? i.images[0].url : null,
      location:
        i.addresses.length > 0
          ? i.addresses[0].city + ', ' + i.addresses[0].stateCode
          : null,
    }));
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

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
      console.log(
        `No images found for parkId ${random}.  Trying a different park`
      );
      throw error;
    }
    return {
      address:
        json.data[0].addresses.length > 0
          ? json.data[0].addresses[0].city +
            ', ' +
            json.data[0].addresses[0].stateCode
          : '',
      parkCode: json.data[0].parkCode,
      name: json.data[0].fullName,
      images: json.data[0].images,
    };
  } catch (error) {
    if (n === 1) throw error;
    return await fetchRandomPark(n - 1);
  }
};

export const fetchSearchParks = async (query) => {
  const limit = '100';
  const url = `https://developer.nps.gov/api/v1/parks?limit=${limit}&q=${query}&start=0&api_key=${process.env.REACT_APP_NPS_API_KEY}`;
  let err;
  try {
    const res = await fetch(url);
    const json = await res.json();
    if (json.total === '0') {
      err = 'No results found.  Please try searching for something else.';
      throw err;
    }
    const response = json.data.map((i) => {
      return {
        url: i.url,
        name: i.name,
        img: i.images.length > 0 ? i.images[0].url : null,
        parkCode: i.parkCode,
        location:
          i.addresses.length > 0
            ? i.addresses[0].city + ', ' + i.addresses[0].stateCode
            : null,
      };
    });
    return response;
  } catch (error) {
    throw err;
  }
};
