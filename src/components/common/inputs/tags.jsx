import React from 'react';
import PropTypes from 'prop-types';
import Tag from './tag.jsx';

var tagNewKey = -1;

class Tags extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: []
        }

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            tags: nextProps.tags
        })
    }

    onChange(e, key) {
        if (key !== 0) {
            var tag = this.props.tags.find((tag => tag[this.props.tagKeyName] === key));
            tag[this.props.tagValueName] = e.target.value;

            this.setState({
                tags: this.props.tags
            })
        }
    }

    onBlur(e, key) {
        if (e !== null && e.target.value !== '') {
            if (key === 0) {
                const newTag = {};

                newTag[this.props.tagValueName] = e.target.value;
                newTag[this.props.tagKeyName] = tagNewKey;

                this.props.tags.push(newTag);

                this.setState({
                    tags: this.props.tags
                })

                tagNewKey--;

                e.target.value = '';
            }
        }
        else if (key !== 0) {
            var objIndex = this.props.tags.findIndex((tag => tag[this.props.tagKeyName] === key));
            this.props.tags.splice(objIndex, 1);

            this.setState({
                tags: this.props.tags
            })
        }
    }

    render() {
        console.log(this.state.tags)
        return (
            <div className="form-group">
                <label>{this.props.label}</label>
                <div className="row tags" >
                    {this.state.tags !== null ? this.state.tags.map((tag, i) =>
                        <Tag key={tag[this.props.tagKeyName]} onRemove={this.props.onRemove} disabled={this.props.disabled} onBlur={(e) => this.onBlur(e, tag[this.props.tagKeyName])}
                            tagValue={tag[this.props.tagValueName]} tagId={tag[this.props.tagIdName]} tagColor={tag[this.props.tagColorName]} tagTextColor={tag[this.props.tagTextColorName]}
                            onChange={(e) => this.onChange(e, tag[this.props.tagKeyName])}
                            onEdit={this.props.onEdit != undefined ? (e) => this.props.onEdit(e, tag[this.props.tagKeyName]) : undefined} />) : null}
                    {this.props.disabled !== null && this.props.disabled ? null :
                        <Tag onBlur={(e) => this.onBlur(e, 0)} onChange={(e) => this.onChange(e, 0)} />}
                </div>
            </div>
        )
    }
}

Tags.propTypes = {
    tagKeyName: PropTypes.string.isRequired,
    tagValueName: PropTypes.string.isRequired,
    tagIdName: PropTypes.string.isRequired,
    tagColorName: PropTypes.string,
    tagTextColorName: PropTypes.string,
    tags: PropTypes.array,
    label: PropTypes.string,
    onEdit: PropTypes.func,
    disabled: PropTypes.bool,
    onRemove: PropTypes.func
}

export default Tags;