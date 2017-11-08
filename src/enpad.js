import React, {Component, cloneElement} from 'react';
import PropTypes from 'prop-types';
import styles from './style.less';

import {backspace, shift, shift2} from './svgicon';

export default class Enpad extends Component {

  static defaultProps = {
    value : '',
    dark: false
  }

  static uiName = 'Enpad';

  state = {
    padId: 'lowerCase'
  }

  constructor(props){
    super(props);

    const renderKeys = this.renderKeys;
    const renderSpecialkey = this.renderSpecialkey;
    const pads = this.pads = {};


    pads['lowerCase'] = (
      <ul>
        <li>
          {renderKeys('qwertyuiop')}
        </li>
        <li>
          {renderKeys('asdfghjkl')}
        </li>
        <li>
          {renderSpecialkey('shift', shift, this.switchPad('upperCase'))}
          {renderKeys('zxcvbnm')}
          {renderSpecialkey('backspace', backspace, this.keypress('backspace'))}
        </li>
        <li>
          {renderSpecialkey('numbers', '.?123', this.switchPad('numbers'))}
          {renderSpecialkey('space', '空格', this.keypress('main', ' '))}
          {renderSpecialkey('return', '完成', this.done)}
        </li>
      </ul>
    );

    pads['upperCase'] = (
      <ul>
        <li>
          {renderKeys('QWERTYUIOP')}
        </li>
        <li>
          {renderKeys('ASDFGHJKL')}
        </li>
        <li>
          {renderSpecialkey('shift', shift2, this.switchPad('lowerCase'))}
          {renderKeys('ZXCVBNM')}
          {renderSpecialkey('backspace', backspace, this.keypress('backspace'))}
        </li>
        <li>
          {renderSpecialkey('numbers', '.?123', this.switchPad('numbers'))}
          {renderSpecialkey('space', '空格', this.keypress('main', ' '))}
          {renderSpecialkey('return', '完成', this.done)}
        </li>
      </ul>
    );

    pads['numbers'] = (
      <ul>
        <li>
          {renderKeys('1234567890')}
        </li>
        <li>
          {renderKeys('-/:()$&@"')}
        </li>
        <li>
          {renderSpecialkey('shift', '#+=', this.switchPad('symbol'))}
          {renderKeys('.,?!\'')}
          {renderSpecialkey('backspace', backspace, this.keypress('backspace'))}
        </li>
        <li>
          {renderSpecialkey('numbers', 'ABC', this.switchPad('lowerCase'))}
          {renderSpecialkey('space', '空格', this.keypress('main', ' '))}
          {renderSpecialkey('return', '完成', this.done)}
        </li>
      </ul>
    );

    pads['symbol'] = (
      <ul>
        <li>
          {renderKeys('[]{}#%^*+=')}
        </li>
        <li>
          {renderKeys('_\|~<>€£￥⦁')}
        </li>
        <li>
          {renderSpecialkey('shift', '123', this.switchPad('numbers'))}
          {renderKeys('.,?!\'')}
          {renderSpecialkey('backspace', backspace, this.keypress('backspace'))}
        </li>
        <li>
          {renderSpecialkey('numbers', 'ABC', this.switchPad('lowerCase'))}
          {renderSpecialkey('space', '空格', this.keypress('main', ' '))}
          {renderSpecialkey('return', '完成', this.done)}
        </li>
      </ul>
    );
  }

  renderKeys = keys => keys.split('').map((item, index)=>(
    <button key={index} onClick={this.keypress('main', item)}>{item}</button>
  ));

  renderSpecialkey = (keys, name, click) => (
    <button className={`${styles['specialkey']} ${styles[keys]}`} onClick={click}>{name}</button>
  );

  del = (value)=>{
    return String(value).slice(0, value.length - 1);
  }

  add = (value, key)=>{
    const {maxLength} = this.props;
    if(maxLength && value.length >= maxLength) { return value; }
    return value + key;
  }

  done = ()=>{
    const {done} = this.props;
    done && done();
  }

  keypress = (type, key)=> () => {
    const onChange = this.props.onChange;
    const value = this.props.value;
    switch (type) {
      case 'backspace':
        onChange && onChange(this.del(value));
        break;
      case 'main':
        onChange && onChange(this.add(value, key));
        break;
      default:
    }
  }

  switchPad = (id)=> () => this.setState({padId: id});

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.dark != this.props.dark || nextState.padId != this.state.padId){
      return true;
    }
    return false;
  }

  render() {

    const toolbar = (
      <div className={styles['bar']}>安全键盘</div>
    );

    const dark = this.props.dark;
    const css = `${styles['iphone-keyboard']} ${styles['enpad']} ${dark? styles['theme-dark']: ''}`;

    return cloneElement(this.pads[this.state.padId], {className:  css});

  }
}
