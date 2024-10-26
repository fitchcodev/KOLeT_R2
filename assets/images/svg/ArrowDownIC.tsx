import React from "react";
import Svg, { G, Path } from "react-native-svg";

export default function ArrowDownIC({width, height}) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G id="arrow-down-01">
        <Path
          id="Vector"
          d="M13.5 6.75004C13.5 6.75004 10.1858 11.25 9 11.25C7.8141 11.25 4.5 6.75 4.5 6.75"
          stroke="#999999"
          strokeWidth="1.125"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}
