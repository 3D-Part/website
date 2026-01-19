import React from 'react'

interface IRibbon {
    text: string;
    background: string;
    color?: string;
    textSize?: string;
}

const Ribbon: React.FC<IRibbon> = ({ text, background, color, textSize }) => {
    return (
        <div className={` absolute z-10 py-2 px-4 rounded-br-lg font-bold  ${color ? color : ''} ${background} text-${textSize ? textSize : 'base'}`}>{text}</div>
    )
}

export default Ribbon