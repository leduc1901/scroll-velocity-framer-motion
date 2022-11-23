import { InfiniteCarousel } from "./InfiniteCarousel";
import { ParallaxText } from "./ParallaxText";
import { spring, useVariants } from "./config";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

export default function App() {
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState("default");

  const ref = useRef(null);

  const variants = useVariants(ref);

  function clickEnter() {
    setCursorText("Click");
    setCursorVariant("click");
  }

  function clickLeave() {
    setCursorText("");
    setCursorVariant("default");
  }

  return (
    <section ref={ref}>
      <motion.div
        variants={variants}
        className="circle"
        animate={cursorVariant}
        transition={spring}
      >
        <span className="cursorText">{cursorText}</span>
      </motion.div>
      <ParallaxText>A Wild Sheep Chase</ParallaxText>
      <div
        id="scene"
        onMouseEnter={clickEnter}
        onMouseLeave={clickLeave}
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          perspective: "2000px",
          width: "100vw",
          marginTop: 80,
          height: 800,
        }}
      >
        <InfiniteCarousel />
      </div>
    </section>
  );
}
