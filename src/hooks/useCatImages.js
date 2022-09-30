import { useState, useEffect} from "react";

export function useCatImages(page) {
  const [images, setImages] = useState([]);

  const getCatImages = (page = 0, limit = 5) => {
    try {
      fetch(
          `https://api.thecatapi.com/v1/images/search?limit=${limit}&page=${page}&has_breeds=1`,
          {headers: {
              'x-api-key': 'live_s3YH7mGAJembPJI8ODwIqljrGleCSZwYaxJNRp2XcldK16OgYHxgaeLvCG60GwMO'
            }}
      ).then(async (res) => {
        setImages(images.concat(await res.json()))
      });
    } catch (e) {
      console.error("fetch failed!");
      console.error(e);
    }
  }

  useEffect(()=>{
    getCatImages(page);
  },[page])


  return images;
}
