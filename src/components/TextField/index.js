import React from 'react';
import '../../scss/components/_textfield.scss';

const TextField = ({
    label = null,
    type = 'text',
    placeholder = '',
    customClass = '',
    disabled = false,
    onRef,
    InputProps=null,
    ...props
}) => {
    return (
       <div className='relative'>
            <input
            type={type}
            disabled={disabled}
            className={`text textfield ${customClass} ${disabled ? 'textfield--disabled' : ''}`}
            placeholder={placeholder}
            ref = {onRef}
            {...props}
        />
        {
            InputProps?.endAdornment
        }
       </div>
    );
};

export default TextField;
