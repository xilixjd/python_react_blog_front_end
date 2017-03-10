import React, {Component} from 'react';

export default class Cell extends Component {
    formatTime(timeStamp) {
        let time = new Date(timeStamp)
        let year = time.getFullYear()
        let month = time.getMonth() + 1
        let day = time.getDate()
        return year + '-' + month + '-' + day
    }

    render() {
        let title = this.props.title
        let time = this.props.time
        return (
            <a href={'#post/' + this.props.id}>
                <li className="list-post">
                    <span className="date-long">{this.formatTime(time)}</span>
                    <span className="list-title">{title}</span>
                </li>
            </a>
        );
    }
};