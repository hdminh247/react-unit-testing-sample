import { useState, useEffect} from "react";

export function useCatBreeds() {
  const [breeds, setBreeds] = useState([]);

  const getCatBreeds = () => {
    try {
      fetch(
          `https://api.thecatapi.com/v1/breeds`,
          {headers: {
              'x-api-key': 'live_s3YH7mGAJembPJI8ODwIqljrGleCSZwYaxJNRp2XcldK16OgYHxgaeLvCG60GwMO'
            }}
      ).then(async (res) => {
        setBreeds(breeds.concat(await res.json()))
      });
    } catch (e) {
      console.error("fetch failed!");
      console.error(e);
    }
  }

  useEffect(()=>{
    getCatBreeds();
  },[])


  return breeds;
}
