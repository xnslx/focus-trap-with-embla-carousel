import React, { useState } from "react";
import { motion } from "framer-motion";

import "../css/embla.css";

const BackgroundColorComponent = ({ children, rotateNum }) => {
  console.log("bg", rotateNum);
  return (
    <motion.svg className="test__background">
      <motion.linearGradient
        id="myGradient"
        animate={{
          gradientTransform: `rotate(${rotateNum})`
        }}
      >
        <stop offset="5%" stop-color="#f4791f" />
        <stop offset="95%" stop-color="#659999" />
      </motion.linearGradient>
      <motion.rect
        x="0"
        y="0"
        stroke-width="5"
        strokeLinejoin="round"
        stroke="#fff"
        width="100%"
        height="100%"
        fill="url(#myGradient)"
      />
      {children}
    </motion.svg>
  );
};

export default BackgroundColorComponent;
