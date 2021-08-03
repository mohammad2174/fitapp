import React from 'react';

export default ({ label, name, className, errors = [], ...props }) => {
    return (
        <div className={className}>
                <label htmlFor={name}>
                    {label}
                </label>
            <input
                id={name}
                name={name}
                {...props}
                className={`form-control`}
            />
            {errors && <div style={{color:'red'}}>{errors[0]}</div>}
        </div>
    );
};
