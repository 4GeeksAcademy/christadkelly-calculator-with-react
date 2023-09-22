import React from "react";

const Button = (prop) => {
    const digit = prop.buttonValue;
    const buttonHandler = prop.buttonHandler

    return (
        <>
            <button onClick={() => buttonHandler(digit)}>
                {digit}
            </button>
        </>
    )
};

export default Button;