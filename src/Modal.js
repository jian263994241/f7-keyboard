import React, {Component} from 'react';
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


  renderModal = interpolatedStyles => (
    <Mounter>
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
    </Mounter>
  )

  render() {
    const _styles = this.getStyles();

    return (
      <TransitionMotion styles={_styles}>
        {this.renderModal}
      </TransitionMotion>
    );
  }
}
