import { InfiniteCarousel } from "./InfiniteCarousel";
import { ParallaxText } from "./ParallaxText";

export default function App() {
  return (
    <section>
      <ParallaxText>A Wild Sheep Chase</ParallaxText>
      <div
        id="scene"
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
