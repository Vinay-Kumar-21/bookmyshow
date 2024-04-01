import React from 'react'

export default function Button({ title, onClick, variant, disabled, fullwidth, type }) {
    let className = "bg-primary p-1 text-white ml-1 mr-1";

    if (fullwidth) {
        className += " w-full";
    }

    if (variant === "outlined") {
        className = className.replace(
            "bg-primary",
            "border border-primary text-primary bg-white"
        )
    }
    return (

        <button className={className} type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {title}
        </button>

    )
}
