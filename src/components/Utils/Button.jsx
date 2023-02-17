import React from 'react';

function Button(props) {
    const { text, size } = props;
    const buttonStyle = {
        fontSize: size == 'large' ? '1.30rem' : '0.9rem',
        width: size == 'large' ? '160px' : '120px',
        height: size == 'large' ? '50px' : '40px',
    };
    return (
        <button className='button' style={buttonStyle}>
            {text}
        </button>
    );
}

export default Button;
