import React, {useState} from "react";
import { useCatImages } from "./hooks/useCatImages";
import "./App.css";

function App() {
  const images = useCatImages();
  const [showDetails, setShowDetails] = useState(false)

  return (
    <>
        <div className={"show-detail-toggle-btn"}>
            <b>Show Details</b>
            <label className="switch" >
                <input data-testid="toggle" type="checkbox" checked={showDetails} onChange={
                    (e)=>{
                        setShowDetails(e.target.checked)}
                }/>
                <span className="slider round" />
            </label>
        </div>

      <h1>Images of Cats</h1>
      <ul>
        {images.map(({ id, height, url, width, breeds }) => (
          <li key={id}>
              {showDetails &&
                  <div className={"cat-info"}>
                      <b>Breads Details</b>
                      <ul>
                  {breeds.map(({name, description}, index)=>{
                      return  <ul key={index}>
                          <li>
                              Name: {name}
                          </li>
                          <li>
                              Description: {description}
                          </li>
                      </ul>
                  })}
                  </ul>
                  </div>}


            <img src={url} alt={id} height={height} width={width} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
