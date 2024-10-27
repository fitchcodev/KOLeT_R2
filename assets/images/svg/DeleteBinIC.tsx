import * as React from "react"
import Svg, { SvgProps, G, Path } from "react-native-svg"
const DeleteBinIC = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={16}
    fill="none"
    viewBox="0 0 15 16"
    {...props}
  >
    <G stroke="#999" strokeLinecap="round" strokeWidth={0.938}>
      <Path d="m12.188 3.938-.388 6.265c-.099 1.601-.148 2.401-.55 2.977a2.499 2.499 0 0 1-.75.705c-.599.365-1.4.365-3.005.365-1.606 0-2.409 0-3.008-.366a2.499 2.499 0 0 1-.75-.706c-.401-.576-.45-1.378-.547-2.981l-.377-6.26" />
      <Path d="M1.875 3.938h11.25m-3.09 0-.427-.88c-.283-.585-.425-.878-.67-1.06a1.246 1.246 0 0 0-.171-.108c-.27-.14-.596-.14-1.245-.14-.667 0-1 0-1.275.146-.06.033-.119.07-.174.112-.247.19-.385.493-.661 1.099l-.379.83M5.938 10.813v-3.75M9.063 10.813v-3.75" />
    </G>
  </Svg>
)
export default DeleteBinIC
