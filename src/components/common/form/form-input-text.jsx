import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../inputs/text-input';
import TextInputTitle from '../inputs/text-input-title';

const FormInputText = ({ formMap, formData, onChange }) => {
    if (formMap.label != undefined) {
        return (
            <TextInputTitle label={formMap.label} placeholder={formMap.placeholder} type={formMap.type} name={formMap.name} 
                required={formMap.required} requiredText={formMap.requiredText} onChange={onChange} 
                value={formData[formMap.name] != undefined ? formData[formMap.name].toString() : ''} />
        )
    }
    else {
        return (
            <TextInput placeholder={formMap.placeholder} name={formMap.name} type={formMap.type} onChange={onChange} value={formData[formMap.name]}  
                required={formMap.required} />
        )
    }
}

FormInputText.propTypes = {
    formMap: PropTypes.object.isRequired,
    formData: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
}

export default FormInputText;