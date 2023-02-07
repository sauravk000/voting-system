import React from "react";

const buttonStyle = {
  color: "Black",
  fontFamily: "Montserrat",
  background: "#DAF605",
  border: '1px solid white',
  cursor: 'pointer',
  fontSize: '1rem',
  width: "150px",
  height: "45px",
  borderRadius: "5px",
  textAlign: 'center'
};

function Button(props) {
    const {text} = props;
    return (
        <button style={buttonStyle}>
            {text}
        </button>
    )
};

export default Button;