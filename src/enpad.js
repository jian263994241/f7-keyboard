import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {PickerModal} from 'f7-modal';
import styles from './enpad.less';

import {backspace, shift, shift2} from './svgicon';

export default class Qwert extends Component {

  static defaultProps = {
    value : ''
  }

  state = {
    padId: 'lowerCase'
  }

  constructor(props){
    super(props);

    const renderKeys = this.renderKeys;
    const renderSpecialkey = this.renderSpecialkey;
    const pads = this.pads = {};

    pads['lowerCase'] = (
      <ul className={styles['iphone-keyboard']}>
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
          {renderSpecialkey('space', '空 格', this.keypress('main', ' '))}
          {renderSpecialkey('return', '完 成', this.done)}
        </li>
      </ul>
    );

    pads['upperCase'] = (
      <ul className={styles['iphone-keyboard']}>
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
          {renderSpecialkey('space', '空 格', this.keypress('main', ' '))}
          {renderSpecialkey('return', '完 成', this.done)}
        </li>
      </ul>
    );

    pads['numbers'] = (
      <ul className={styles['iphone-keyboard']}>
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
          {renderSpecialkey('space', '空 格', this.keypress('main', ' '))}
          {renderSpecialkey('return', '完 成', this.done)}
        </li>
      </ul>
    );

    pads['symbol'] = (
      <ul className={styles['iphone-keyboard']}>
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
          {renderSpecialkey('space', '空 格', this.keypress('main', ' '))}
          {renderSpecialkey('return', '完 成', this.done)}
        </li>
      </ul>
    );
  }

  renderKeys = keys => keys.split('').map((item, index)=>(
    <button key={index} onClick={this.keypress('main', item)}>{item}</button>
  ));

  renderSpecialkey = (keys, name, click) => (
    <button className={classnames(styles['specialkey'], styles[keys])} onClick={click}>{name}</button>
  );

  del = (value)=>{
    return String(value).slice(0, value.length - 1);
  }

  add = (value, key)=>{
    return value + key;
  }

  done = ()=>{
    console.log('done');
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

  render() {

    const toolbar = (
      <div className={styles['bar']}>安全键盘</div>
    );

    return this.pads[this.state.padId];

  }
}
