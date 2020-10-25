import React from "react";
import "./Button.css";

const isOperator = val => {
  return !isNaN(val) || val === "," || val === "AC";
};

const isMemory = val => {
    if(val.charAt(0) !== 'M'){
    return true}
  };


export const Button = props => (
  <div
    className={`button-wrapper ${
      isOperator(props.children) ? null : "operator"
    }
    ${
        isMemory(props.children) ? null : "memory"
      }`}
    onClick={() => props.handleClick(props.children)}
  >
    {props.children}
  </div>
);

export default Button;