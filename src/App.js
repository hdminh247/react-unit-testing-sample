import React, {useState} from "react";
import { Waypoint } from "react-waypoint";
import { useCatImages } from "./hooks/useCatImages";
import "./App.css";

function App() {
  const [page, setPage] = useState(0);
  const images = useCatImages(page);
  const [showDetails, setShowDetails] = useState(false)

    const loadMore = () => {
      if(images.length > 0 && images.length + 5 <= 20){
          setPage(page + 1)
      }

    }

  return (
    <div id={'container'}>
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
      <ul id={"cat-list"}>
        {images.map(({ id, height, url, width, breeds }, index) => (
          <li key={index}>
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
        <Waypoint onEnter={loadMore} fireOnRapidScroll={false} />
    </div>
  );
}

export default App;
