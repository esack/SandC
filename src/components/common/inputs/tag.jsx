import React from 'react';
import TextInput from './text-input.jsx';

class Tag extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            background_color: this.props.tagColor === undefined ? 'bg-aqua' : '',
            show_input: ' hidden',
            input_button: 'fa fa-plus-square',
            tag_name: '',
            input_style: {},
            inputRef: null
        };

        if (this.props.tagValue) {
            var _this = this;
            this.state.input_button = 'fa fa-close';
            this.state.show_input = '';
        }

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.buttonClick = this.buttonClick.bind(this);
    };

    componentWillReceiveProps(nextProps) {
        var inputStyle = {};

        if (nextProps.tagColor != undefined) {
            inputStyle.backgroundColor = nextProps.tagColor;
        }
        if (nextProps.tagTextColor != undefined) {
            inputStyle.color = nextProps.tagTextColor;
        }
        if(inputStyle !== {}) {
            this.setState({ input_style: inputStyle });
        }
    }

    buttonClick(e) {
        if (this.state.input_button === 'fa fa-close') {
            if(this.props.onRemove) {
                this.props.onRemove(this.props.tagId);
            } else {
                this.setState({ tag_name: '' });
                this.setState({ show_input: ' hidden' });
                this.setState({ input_button: 'fa fa-plus-square' });
                this.props.onBlur(null);
            }
        }
        else {
            var _this = this;
            this.setState({ input_button: 'fa fa-close' });
            this.setState({ show_input: '' }, function () {
                _this.textInput.refs.myInput.focus();
            });
        }
    }

    onFocus(e) {
        this.setState({ background_color: '' });
    }

    onBlur(e) {
        if (this.props.tagColor === undefined)
            this.setState({ background_color: 'bg-aqua' });

        this.props.onBlur(e);

        if (e.target.value === '') {
            this.setState({ tag_name: '' });
            this.setState({ show_input: ' hidden' });
            this.setState({ input_button: 'fa fa-plus-square' });
        }
    }

    onChange(e) {
        this.setState({ input_button: 'fa fa-close' });
        this.props.onChange(e);
    }

    render() {
        return (
            <div className="tag">
                <div className="input-group">
                    <TextInput name="tag_name" onChange={this.onChange} value={this.props.tagValue} onFocus={this.onFocus}
                        disabled={this.props.disabled} className={this.state.background_color + this.state.show_input}
                        onBlur={this.onBlur} style={this.state.input_style} ref={(input) => { this.textInput = input; }} />
                    {this.props.disabled !== null && this.props.disabled && !this.props.onRemove ? null :
                        <div className="input-group-btn" style={{}}>
                            <button type="button" onClick={this.buttonClick} className="btn btn-info" aria-label="Help"><span className={'fa ' + this.state.input_button}></span></button>
                        </div>
                    }
                    {this.props.onEdit != undefined ?
                        <div className="input-group-btn">
                            <button type="button" onClick={(e) => this.props.onEdit(e)} className="btn btn-info" aria-label="Help"><span className='fa fa-edit'></span></button>
                        </div> : null
                    }
                </div>
            </div>
        )
    }
}

Tag.propTypes = {
    onBlur: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onEdit: React.PropTypes.func,
    tagValue: React.PropTypes.string,
    tagId: React.PropTypes.number,
    tagColor: React.PropTypes.string,
    tagTextColor: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    onRemove: React.PropTypes.func
}

export default Tag;