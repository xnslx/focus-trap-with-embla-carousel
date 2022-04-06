import React from "react";
import ReactDOM from "react-dom";
import EmblaCarousel from "./EmblaCarousel";
import "../css/base.css";
import "../css/reset.css";
import "../css/header.css";
import "../css/footer.css";

const App = () => (
  <main>
    <EmblaCarousel />
  </main>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
