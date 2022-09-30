import { useState, useEffect} from "react";

export function useCatImages(deps = []) {
  const [images, setImages] = useState([]);

  const getCatImages = () => {
    try {
      fetch(
          "https://api.thecatapi.com/v1/images/search?limit=5&has_breeds=1",
          {headers: {
              'x-api-key': 'live_s3YH7mGAJembPJI8ODwIqljrGleCSZwYaxJNRp2XcldK16OgYHxgaeLvCG60GwMO'
            }}
      ).then(async (res) => {
        setImages(await res.json())
      });
    } catch (e) {
      console.error("fetch failed!");
      console.error(e);
    }
  }

  useEffect(()=>{
    getCatImages();
  },[])


  return images;
}
