import React from 'react';
import '../../scss/components/_textfield.scss';

const TextField = ({
    label = null,
    type = 'text',
    placeholder = '',
    customClass = '',
    disabled = false,
    onRef,
    ...props
}) => {
    return (
        <input
            type={type}
            disabled={disabled}
            className={`text textfield ${customClass} ${disabled ? 'textfield--disabled' : ''}`}
            placeholder={placeholder}
            ref = {onRef}
            {...props}
        />
    );
};

export default TextField;
