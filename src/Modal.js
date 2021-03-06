import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import Mounter from 'rc-mounter'
import styles from './style.less';
import TransitionMotion from 'react-motion/lib/TransitionMotion';
import spring from 'react-motion/lib/spring';


export default class Modal extends Component {

  getStyles = ()=>{

    const config = {stiffness: 120, damping: 17};

    if(this.props.visible){
      return [ { key: 'a', style: { x: spring(0, config) } } ]
    }

    return [{ key: 'a', style: { x: spring(100, config) } }]
  }

  getModal = ()=>{
    return findDOMNode(this.refs.modal);
  }

  renderModal = interpolatedStyles => {

    return (
      <div>
        {
          interpolatedStyles.map(({key, style})=>{
            return (
              <div
                className={styles['modal']}
                key={key}
                style={{transform: `translate3d(0, ${style.x}%, 0)`, display: style.x >= 98 ? 'none': 'block'}}>
                {this.props.children}
              </div>
            )
          })
        }
      </div>
    )
  }

  render() {
    const {
      className,
      style,
    } = this.props;
    const _styles = this.getStyles();
    const Element = this.props.inline ? 'div' : Mounter;

    return (
      <Element
        className={className}
        style={style}
        >
        <TransitionMotion styles={_styles} ref="modal">
          {this.renderModal}
        </TransitionMotion>
      </Element>

    );
  }
}
