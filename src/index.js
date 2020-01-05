import React from "react";
import ReactDOM from "react-dom/profiling";
import classNames from "classnames";

import "./styles.css";
import State, { StateContext } from "./lib/StateProvider";

function useFavoriteToggle() {
  const { favorite } = React.useContext(StateContext);
  return favorite;
}

function Image(props) {
  const favorite = useFavoriteToggle();

  function handleClick() {
    favorite(props.index);
  }

  return (
    <>
      <img
        src={props.src}
        className={classNames({ favorite: props.favorite })}
        alt={props.alt}
        width="200"
        onClick={handleClick}
      />
      <Hello />
    </>
  );
}

function Hello() {
  return <div>Shouldn't Rerender</div>;
}

function Gallery() {
  const { images } = React.useContext(StateContext);

  return (
    <div className="gallery">
      <Hello />
      {images.map((image, ix) => (
        <Image key={image.id} index={ix} {...image} />
      ))}
    </div>
  );
}

function App() {
  return (
    <>
      <Hello />
      <State>
        <div className="App">
          <h1>Context & Redraw Test/Example</h1>
          <Gallery />
        </div>
      </State>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
