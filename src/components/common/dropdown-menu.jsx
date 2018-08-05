import React from 'react';
import DropdownMenuMessage from './dropdown-menu-message.jsx';

export class DropdownMenu extends React.Component {
    render() {
        return (
            <li className={"dropdown messages-menu"}>
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                    <i className={"fa fa-envelope-o"}></i>
                    <span className="label label-success">{this.props.messageCount}</span>
                </a>
                <ul className="dropdown-menu">
                <li className="header">You have {this.props.messageCount} messages</li>
                        {this.props.messages === "undefined" 
                            ? this.props.messages.map((message, i) => <li><ul className="menu"><DropdownMenuMessage key={message.note_id} message={message} /></ul></li>) 
                            : ""}
                <li className="footer"><a href="#">See All Messages</a></li>
                </ul>
            </li>
        )
    }
}

DropdownMenu.propTypes = {
   messageCount: React.PropTypes.string.isRequired,
   messages: React.PropTypes.array
}

export default DropdownMenu;
