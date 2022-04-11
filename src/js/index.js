import React, { useState } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import EmblaCarousel from "./EmblaCarousel";
import "../css/base.css";
import "../css/reset.css";
import "../css/header.css";
import "../css/footer.css";
import BackgroundColorComponent from "./BackgroundColorComponent";

const App = () => {
  const [rotation, setRotation] = useState(0);
  return (
    <main>
      <BackgroundColorComponent />
      <EmblaCarousel />
    </main>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
