const url =
  'https://developer.nps.gov/api/v1/parks?parkCode=moja&api_key=eb1riCgdkmefDtgxmfMqe8cjlaMkxR2VZvEq0Tfp';

// export const fetchPark = (parkId) => {
//   fetch(url)
//     .then((res) => res.json())
//     .then((res) => console.log(res.data));
// };

export const fetchPark = async (parkId) => {
  try {
    const res = await fetch(url);
    const json = await res.json();
    return json.data[0];
  } catch (error) {
    console.log(error.message);
  }
};
