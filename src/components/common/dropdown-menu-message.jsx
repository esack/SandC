import React from 'react';

export class DropdownMenuMessage extends React.Component {
    render() {
        return (
            <li>
                <a href="#">
                <div className="pull-left">
                    <img src={this.props.message.userImageURL} className="img-circle" alt="User Image" />
                </div>
                <h4>
                    {this.props.message.userName}
                    <small><i className="fa fa-clock-o"></i> {this.props.message.date}</small>
                </h4>
                <p>{this.props.message.text}</p>
                </a>
            </li>
        )
    }
}

DropdownMenuMessage.propTypes = {
   message: React.PropTypes.object.isRequired
}

export default DropdownMenuMessage;
