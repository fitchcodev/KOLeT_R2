import * as React from "react"
import Svg, { SvgProps, G, Path } from "react-native-svg"
const AddCircleIC = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.height}
    height={props.width}
    fill="none"
    viewBox="0 0 15 16"
    {...props}
  >
    <G stroke="#999" strokeWidth={0.938}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 5.5v5M10 8H5"
      />
      <Path d="M13.75 8a6.25 6.25 0 1 0-12.5 0 6.25 6.25 0 0 0 12.5 0Z" />
    </G>
  </Svg>
)
export default AddCircleIC
