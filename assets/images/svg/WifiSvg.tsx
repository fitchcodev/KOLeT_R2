import * as React from "react"
import Svg, { SvgProps, G, Mask, Path, Defs, ClipPath } from "react-native-svg"
const WifiSvgIC = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    fill="none"
    viewBox={`0 0 ${props.width} ${props.height}`}
    {...props}
  >
    <G clipPath="url(#a)">
      <Mask
        id="b"
        width={41}
        height={40}
        x={-1}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: "luminance",
        }}
      >
        <Path fill="#fff" d="M40 40V0H0v40h40Z" />
      </Mask>
      <G
        stroke="#333"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        mask="url(#b)"
      >
        <Path d="M16.666 15S20 15.833 20 20s-3.334 5-3.334 5M20 11.667s5 1.389 5 8.333c0 6.945-5 8.334-5 8.334" />
        <Path d="M23.333 8.333S30 10.277 30 20c0 9.722-6.667 11.666-6.667 11.666" />
      </G>
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h40v40H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default WifiSvgIC
