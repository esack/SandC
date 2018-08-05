import React from 'react';
import { Checkbox } from 'react-icheck';

class CheckBox extends React.Component {
    render() {
        return (
            <div className="checkbox icheck">
                <Checkbox
                    checkboxClass="icheckbox_square-blue"
                    increaseArea="20%"
                    label={" " + this.props.label}
                    onChange={this.props.onChange}
                    name={this.props.name}
                    checked={this.props.checked != undefined ? this.props.checked : false}
                />
            </div>
        )
    }
}


CheckBox.propTypes = {
    label: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
    checked: React.PropTypes.bool,
    name: React.PropTypes.string.isRequired
}

export default CheckBox;