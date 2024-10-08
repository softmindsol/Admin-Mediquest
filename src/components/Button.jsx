import React from "react";

const Button = ({
  type,
  disabled,
  text,
  onClick,
  className: styles,
  icon: Icon,
  iconPosition = "left",
  children,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={` ${styles}`}
    >
      {iconPosition === "left" && Icon && (
        <Icon className="inline-block mr-2" />
      )}
      {text ? text : children}
      {iconPosition === "right" && Icon && (
        <Icon className="inline-block ml-2" />
      )}
    </button>
  );
};

export default Button;
