import React from 'react'
import * as Svg from 'react-native-svg';
export default function Notofication({width, height,...props}) {
  return (
    <Svg.Svg width={width} height={height} viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<Svg.G id="notification-02">
<Svg.Path id="Vector" d="M2.10826 12.808C1.93105 13.9696 2.72333 14.776 3.69337 15.1778C7.41234 16.7185 12.5877 16.7185 16.3066 15.1778C17.2767 14.776 18.0689 13.9696 17.8917 12.808C17.7828 12.094 17.2443 11.4995 16.8453 10.919C16.3227 10.1494 16.2708 9.30979 16.2707 8.41663C16.2707 4.96484 13.4632 2.16663 10 2.16663C6.53677 2.16663 3.72927 4.96484 3.72927 8.41663C3.72919 9.30979 3.67726 10.1494 3.15467 10.919C2.7557 11.4995 2.21717 12.094 2.10826 12.808Z" stroke={props.stroke || "#333333"} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
<Svg.Path id="Vector_2" d="M6.66667 16.3334C7.04875 17.771 8.39626 18.8334 10 18.8334C11.6038 18.8334 12.9513 17.771 13.3333 16.3334" stroke={props.stroke || "#333333"} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
{/* <circle id="Ellipse 7" cx="15.1667" cy="5.16667" r="4.16667" fill="#E52C2C"/> */}
</Svg.G>
</Svg.Svg>

  )
}
