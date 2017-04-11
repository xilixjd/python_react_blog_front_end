import React, {Component} from 'react';
import Cell from './Cell.js';

// ant motion https://motion.ant.design
import QueueAnim from 'rc-queue-anim'


export default class CellView extends Component {
    render() {
        const items = this.props.items.map((item, index) =>
            <Cell {...item} key={index}/>
        )
        return (
            <div>
                <h2 className="category">{this.props.title}</h2>
                <ul>
                    {items}
                </ul>
            </div>
        )
    }
}