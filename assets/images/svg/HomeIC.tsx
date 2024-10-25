import React from 'react'
import * as Svg from 'react-native-svg';

export default function HomeIC({width, height, stroke}) {
  return (
    <Svg.Svg width={width} height={height} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Svg.G id="Home">
    <Svg.Path id="Rectangle 2804" d="M10.4167 21.8749H5.125C4.02043 21.8749 3.125 20.9795 3.125 19.8749V12.776C3.125 12.2643 3.32115 11.772 3.67309 11.4005L11.0481 3.61582C11.8369 2.78314 13.163 2.78314 13.9519 3.61582L21.3269 11.4005C21.6788 11.772 21.875 12.2643 21.875 12.776V19.8749C21.875 20.9795 20.9796 21.8749 19.875 21.8749H14.5833M10.4167 21.8749V16.1249C10.4167 15.8488 10.6405 15.6249 10.9167 15.6249H14.0833C14.3595 15.6249 14.5833 15.8488 14.5833 16.1249V21.8749M10.4167 21.8749H14.5833" stroke={stroke} strokeWidth="1.5"/>
    </Svg.G>
    </Svg.Svg>
    
  )
}
