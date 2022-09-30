import { useState, useEffect} from "react";

export function useCatImages(page, search) {
  const [images, setImages] = useState([]);
  const limit = 5;

  const getCatImages = (page = 0, search) => {
    try {
      fetch(
          `https://api.thecatapi.com/v1/images/search?limit=${limit}&page=${page}&has_breeds=1${search ? `&breed_ids=${search}` : ""}`,
          {headers: {
              'x-api-key': 'live_s3YH7mGAJembPJI8ODwIqljrGleCSZwYaxJNRp2XcldK16OgYHxgaeLvCG60GwMO'
            }}
      ).then(async (res) => {
        if(search){
          setImages(await res.json())
        }else{
          setImages(images.concat(await res.json()))
        }

      });
    } catch (e) {
      console.error("fetch failed!");
      console.error(e);
    }
  }

  useEffect(()=>{
    getCatImages(page, search);
  },[page, search])


  return images;
}
