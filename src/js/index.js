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
  const [rotateNum, setRotateNum] = useState(0);

  const prevBtnRotation = () => {
    setRotation((rotation) => rotation + 90);
    setRotateNum(rotation);
  };

  const nextBtnRotation = () => {
    setRotation((rotation) => rotation - 90);
    setRotateNum(rotation);
  };

  console.log("25", rotation);

  return (
    <main>
      <BackgroundColorComponent rotateNum={rotation} />
      <EmblaCarousel
        rotation={rotation}
        prevBtnRotation={prevBtnRotation}
        nextBtnRotation={nextBtnRotation}
      />
    </main>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
