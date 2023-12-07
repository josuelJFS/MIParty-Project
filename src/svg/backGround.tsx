import * as React from "react";
import Svg, { Circle, Defs, Ellipse, LinearGradient, Rect, Stop } from "react-native-svg";

export default function SvgComponent(props: any) {
  return (
    <Svg width="100%" height="100%">
      <Ellipse
        cx="80%"
        cy="50%"
        rx="400"
        ry="300"
        transform="rotate(37.9087 913.17 390.786)"
        fill="url(#paint0_linear_1326_25)"
      />
      <Defs>
        <LinearGradient id="paint0_linear_1326_25">
          <Stop stopColor="#2E1776" stopOpacity="1" />
          <Stop offset="0.8" stopColor="#580679" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
