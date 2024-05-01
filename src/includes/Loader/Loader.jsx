import React from "react";
import "./Loader.css";
const Loader = () => {
  return (
    <>
      <span className="span">
        <span className="loading_span_box">
          <div id="loading-wrapper">
            <div id="loading-text">LOADING</div>
            <div id="loading-content"></div>
          </div>
        </span>
      </span>
    </>
  );
};

export default Loader;
