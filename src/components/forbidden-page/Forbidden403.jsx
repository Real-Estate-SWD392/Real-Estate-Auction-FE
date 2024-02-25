import React from "react";
import "./Forbidden403.scss";

const Forbidden403 = () => {
  return (
    <div style={{ marginTop: "" }}>
      <div class="scene">
        <div class="overlay"></div>
        <div class="overlay"></div>
        <div class="overlay"></div>
        <div class="overlay"></div>
        <span class="bg-403">403</span>
        <div class="text">
          <span class="hero-text"></span>
          <span class="msg">
            can't let <span style={{ fontSize: "36px" }}>you</span> in.
          </span>
        </div>
        <div class="lock"></div>
      </div>
    </div>
  );
};

export default Forbidden403;
