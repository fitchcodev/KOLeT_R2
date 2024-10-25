import React from "react";
import * as Svg from 'react-native-svg';
export default function SearchIC({ width, height }) {
  return (
    <Svg.Svg
      width={width}
      height={height}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Svg.G id="search">
        <Svg.G clip-path="url(#clip0_128_1071)">
          <Svg.Path
            id="Vector"
            d="M14.5833 14.083L18.3333 19.083"
            stroke="#999999"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Svg.Path
            id="Vector_2"
            d="M17 8.5C17 4.35787 13.6422 1 9.5 1C5.35787 1 2 4.35787 2 8.5C2 12.6422 5.35787 16 9.5 16C13.6422 16 17 12.6422 17 8.5Z"
            stroke="#999999"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </Svg.G>
      </Svg.G>
      <Svg.Defs>
        <Svg.ClipPath id="clip0_128_1071">
          <Svg.Rect y="0.5" width="20" height="20" fill="white" />
        </Svg.ClipPath>
      </Svg.Defs>
    </Svg.Svg>
  );
}
