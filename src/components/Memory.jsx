import React, {Component} from 'react';
import "./Memory.css";

class Memory extends Component {
  render() {
      return(<div className="memory-wrapper">
                {this.props.item.val}
                <div className={'button-memory'} onClick={() => this.props.handleClick('MC'+this.props.item.id)}>
                    MC
                </div>
                <div className={'button-memory'} onClick={() => this.props.handleClick('MR'+this.props.item.id)}>
                    MR
                </div>
            </div>
);
  }
}

export default Memory;