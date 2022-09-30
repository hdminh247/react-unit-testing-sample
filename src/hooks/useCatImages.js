import { useState, useEffect} from "react";

export function useCatImages(page, search) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const limit = 5;

  const getCatImages = (page = 0, search) => {
    try {
      setLoading(true)
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

        setError("")

        setLoading(false)

      });
    } catch (e) {
      console.error("fetch failed!");
      console.error(e);
      setError("Fail to fetch images")
      setLoading(true)
    }
  }

  useEffect(()=>{
    getCatImages(page, search);
  },[page, search])


  return {loading, images, error};
}
