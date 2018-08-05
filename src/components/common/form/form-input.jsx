import React from 'react';
import PropTypes from 'prop-types';
import FormInputText from './form-input-text';
import Textarea from '../inputs/textarea';
import Dropdown from '../inputs/dropdown';
import Tags from '../inputs/tags';
import CheckBox from '../inputs/checkbox-input-title';
import FileUpload from '../inputs/file-uplaod'

class FormInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.formData[this.props.formMap.name]
        }

        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.formData[nextProps.formMap.name]
        })
    }

    onChange(event) {
        if (this.props.formMap.type === "checkbox") {
            this.props.formData[this.props.formMap.name] = event.target.checked;
            this.setState({
                value: event.target.checked
            });
        }
        else if(this.props.formMap.type === "file"){
            this.props.formData[this.props.formMap.name] = event;
            this.setState({
                value: event
            });
        }
        else {
            this.props.formData[this.props.formMap.name] = event.target.value;
            this.setState({
                value: event.target.value
            });
        }
    }

    render() {
        if (this.props.formMap.type === "text" || this.props.formMap.type === "email") {
            return (
                <FormInputText formMap={this.props.formMap} formData={this.props.formData} onChange={this.onChange} />
            );
        }
        else if (this.props.formMap.type === "textarea") {
            return (
                <Textarea label={this.props.formMap.label} placeholder={this.props.formMap.placeholder}
                    name={this.props.formMap.name} onChange={this.onChange} value={this.state.value} />
            );
        }
        else if (this.props.formMap.type === "select") {
            return (
                <Dropdown label={this.props.formMap.label} name={this.props.formMap.name} onChange={this.onChange} required={this.props.formMap.required}
                    value={ this.props.formData[this.props.formMap.name] } options={this.props.formMap.options} />
            );
        }
        else if (this.props.formMap.type === "tags") {
            return (
                <Tags tags={this.props.formData[this.props.formMap.name]} tagKeyName={this.props.formMap.tagKeyName} tagValueName={this.props.formMap.tagValueName} />
            );
        }
        else if (this.props.formMap.type === "checkbox") {
            return (
                <CheckBox label={this.props.formMap.label} onChange={this.onChange} name={this.props.formMap.name} checked={this.state.value} />
            );
        }
        else if (this.props.formMap.type === "file") {
            return (
                <FileUpload setFile={this.onChange} />
            );
        }
        else {
            return (<div></div>);
        }
    }
}

FormInput.propTypes = {
    formMap: PropTypes.object.isRequired,
    formData: PropTypes.object.isRequired
}

export default FormInput;