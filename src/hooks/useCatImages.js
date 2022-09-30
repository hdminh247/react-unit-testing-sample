import { useState, useEffect} from "react";

export function useCatImages(deps = []) {
  const [images, setImages] = useState([]);

  const getCatImages = () => {
    try {
      fetch(
          "https://api.thecatapi.com/v1/images/search?limit=5"
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
