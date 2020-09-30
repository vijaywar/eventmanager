import React from 'react'
import PropTypes from 'prop-types'

const Textk = ({ label, name, value, placeholder, type, onChange, error }) => {
    return (

        <div className='form-group form-dark'>
            <label htmlFor={name}>{label}</label>
            <input type={type} name={name}
                class="form-control"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>



    )
}

Textk.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}
Textk.defaultProps = {
    type: 'text'
}
export default Textk;