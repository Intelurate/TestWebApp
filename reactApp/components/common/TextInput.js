import React from 'react';

const TextInput = ({name, label, onChange, placeholder, value, error, icon, type, info }) => {
    let wrapperClass = 'form-group';
    if (error && error.length > 0) {
        wrapperClass += '  '  + 'has-error';
    }

    return (
        <div className={wrapperClass}>
            <label className="control-label" htmlFor={name} >{label}</label>
            <div className="input-icon right">
                <i className={icon}></i>
                <input
                    type={type}
                    name={name}
                    className="form-control"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
                {info && <div className="font-green-sharp">{info}</div>}
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        </div>
    );
};


export default TextInput;