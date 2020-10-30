import React from 'react';

import '../../scss/components/_small-card.scss';
const SmallCard = ({ background, color, className = '', ...props }) => {
    return (
        <div className={`small-card ${className}`} {...props} style={{ background: background, color: color }}>
            {props.children}
        </div>
    );
};

export default SmallCard;
