import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface ParallaxProps {
  children: string;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 300,
  });
  const skewVelocity = useSpring(scrollVelocity, {
    stiffness: 100,
    damping: 30,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const skewVelocityFactor = useTransform(
    skewVelocity,
    [-1000, 1000],
    [-30, 30]
  );
  const x = useTransform(baseX, (v) => `${wrap(0, -25, v)}%`);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }
    if (velocityFactor.get() !== 0) {
      moveBy += directionFactor.current * moveBy * velocityFactor.get();
      baseX.set(baseX.get() + moveBy);
    }
  });

  console.log(x);

  return (
    <div className="parallax">
      <motion.div className="scroller" style={{ x }}>
        <motion.span style={{ skew: skewVelocityFactor }}>
          {children}
        </motion.span>
        <motion.span style={{ skew: skewVelocityFactor }}>
          {children}
        </motion.span>
        <motion.span style={{ skew: skewVelocityFactor }}>
          {children}
        </motion.span>
        <motion.span style={{ skew: skewVelocityFactor }}>
          {children}
        </motion.span>
      </motion.div>
    </div>
  );
}

export default function App() {
  return (
    <section>
      <ParallaxText baseVelocity={-5}>A Wild Sheep Chase</ParallaxText>
    </section>
  );
}
