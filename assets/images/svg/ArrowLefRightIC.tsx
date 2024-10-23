import React from 'react';
import * as Svg from 'react-native-svg';


export default function ArrowLefRightIC({width, height, stroke}) {
  return (
    <Svg.Svg width={width} height={height} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Svg.G id="arrow-left-right">
    <Svg.Path id="Vector" d="M4.83334 13.8335H17.3333" stroke={stroke} stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
    <Svg.Path id="Vector_2" d="M15 11.3335C15 11.3335 17.5 13.1747 17.5 13.8335C17.5 14.4923 15 16.3335 15 16.3335" stroke={stroke}  stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
    <Svg.Path id="Vector_3" d="M4.83334 5.83325H17.3333" stroke={stroke}  stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
    <Svg.Path id="Vector_4" d="M6.49999 3.33325C6.49999 3.33325 4.00001 5.17448 4 5.83327C4 6.49207 6.5 8.33325 6.5 8.33325" stroke={stroke}  stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg.G>
    </Svg.Svg>
    
  )
}
