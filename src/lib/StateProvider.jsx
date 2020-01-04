import React from "react";
import deepMerge from "deepmerge";

import imageData from "../data/images";

export const StateContext = React.createContext();

export default function(props) {
  const [state, setState] = React.useState({ images: imageData });

  function favorite(ix) {
    console.log(`favoriting ${ix}`);
    const newState = deepMerge({}, state);
    newState.images[ix].favorite = !newState.images[ix].favorite;
    setState(newState);
  }

  const context = {
    images: state.images,
    favorite
  };

  return (
    <StateContext.Provider value={context}>
      {props.children}
    </StateContext.Provider>
  );
}
