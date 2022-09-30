import React, {useState} from "react";
import ReactAutocomplete from "react-autocomplete";
import { Waypoint } from "react-waypoint";
import { useCatImages } from "./hooks/useCatImages";
import { useCatBreeds } from "./hooks/useCatBreeds";
import "./App.css";
import Spinner from "./Spinner";

function App() {
  const catBreads = useCatBreeds();
  const getSearchById = (name) => {
    return name ? (catBreads.filter((bread)=>bread.name === name)[0]?.id || "") : ""
  }

  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("")
  const { images, loading, error } = useCatImages(page, getSearchById(search));
  const [infinityScroll, setInfinityScroll] = useState(true)
  const [showDetails, setShowDetails] = useState(false)
  const [mode, setMode] = useState("") // three-col, one-col

    const loadMore = () => {
      if(infinityScroll && images.length > 0 && images.length + 5 <= 20){
          setPage(page + 1)
      }
    }

  return (
    <div id={'container'}>
      {showDetails && <div className={"search-wrapper"}>
        <b>Search By Breed</b>
        <ReactAutocomplete
          items={catBreads}
          shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
          getItemValue={item => item.name}
          renderItem={(item, highlighted) =>
            <div
              key={item.id}
              style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
            >
              {item.name}
            </div>
          }
          value={search}
          onChange={(e)=>{
            setSearch(e.target.value)}
        }
          onSelect={value => {
            setInfinityScroll(false)
            setPage(0)
            setSearch(value)
          }}
        />
      </div>}
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
      <div className={"layout-selection"}>
        <label><b>Layout</b></label>
        <select onChange={(e)=>{setMode(e.target.value || "")}}>
          <option value={""}>Default</option>
          <option value={"one-col"}>1 Column</option>
          <option value={"three-col"}>3 Columns</option>
        </select>
      </div>

      {error && <p className={"error-message"}>{error}</p>}
      {!error && <div id={"cat-list"} className={`row ${mode}`}>
        {images.map(({ id, height, url, width, breeds }, index) => (
          <div key={index} className={"cat-image"}>
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
          </div>
        ))}
      </div>}
      {loading && <div className={"spinner-wrapper"}>
        <Spinner />
      </div>}

        <Waypoint onEnter={loadMore} fireOnRapidScroll={false} />
    </div>
  );
}

export default App;
