import React from "react";
import style from "./actionbutton.module.scss";

const ActionButton = ({ icon, label, color, ...props }) => {
  //alt={label} временное решение
  return (
    <button
      {...props}
      style={{
        backgroundColor: color,
      }}
      className={style.btn}
    >
      <img
        className={style.img}
        src={icon}
        alt={label}
        width={"24"}
        height={"24"}
      />

      {label}
    </button>
  );
};

export default ActionButton;
