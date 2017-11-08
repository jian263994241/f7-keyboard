import React, {Component, createElement} from 'react';
import {findDOMNode} from 'react-dom';
import PropTypes from 'prop-types';

import Numpad from './numpad';
import Enpad from './enpad';
import Modal from './Modal';
import styles from './style.less';


export default class Keyboard extends Component {

  static propTypes = {
    inline: PropTypes.bool,
    keypad: PropTypes.func.isRequired,
    getCancelIgnore: PropTypes.func
  }

  static defaultProps = {
    closeButton: true,
    closeText: '关闭'
  }

  state = {
    value: ''
  }

  input = null;

  getInput = (input)=>{
    const currentInput = document.getElementById(input);

    if(currentInput){
      this.input = currentInput;
      currentInput.readOnly = true;
      this.setState({ value: currentInput.value });
    }else{
      this.input = null;
    }
  }


  componentDidMount() {
    this.getInput(this.props.input);
    if(!this.props.inline){
      document.addEventListener('click', this.cancelIgnore);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.input != this.props.input){
      this.getInput(nextProps.input)
    }
    if(nextProps.visible !=  this.props.visible){
      document.activeElement.blur();
    }
  }

  componentWillUnmount() {
    if(!this.props.inline){
      document.removeEventListener('click', this.cancelIgnore);
    }
  }

  getElement = () => findDOMNode(this);

  getCancelIgnore= ()=> this.input;

  cancelIgnore = (e)=>{
    const _target = e.target;
    const getCancelIgnore = this.getCancelIgnore;
    const onCancel = this.props.onCancel;

    if (!getCancelIgnore || !getCancelIgnore() || this.getElement().contains(_target))
      return false;
    const elements = getCancelIgnore();

    let result = false;
    if (Array.isArray(elements)) {
      elements.every((element, i) => {
        if (element.contains(_target)) {
          result = true;
          return false;
        } else {
          return true;
        }
      })
    } else {
      if (elements.contains(_target)) {
        result = true;
      }
    }

    if (!result && this.props.visible && onCancel) {
      onCancel();
    }

    return result;
  }

  render() {

    const {
      input,
      children,
      inline,
      value,
      dark,
      extraKey,
      random,
      keypad,
      maxLength,
      style,
      visible,
      onCancel,
      title,
      closeButton,
      closeText,
      ...rest
    } = this.props;

    const setValue = (a)=>{
      this.setState({ value: a });
      if(this.input){
        this.input.value = a;
        this.input.scrollLeft = this.input.scrollWidth;
      }
    }

    let props = null;

    if(keypad.uiName == 'Numpad'){
      props = {
        value: this.state.value,
        onChange: setValue,
        random,
        maxLength,
        extraKey,
        dark
      };
    }else{
      props = {
        value: this.state.value,
        onChange: setValue,
        done: onCancel,
        maxLength,
        dark
      };
    }

    const toolbar = (
      <div className={`${styles['toolbar']} ${dark? styles['theme-dark'] : ''}`}>
        <div className="right">
          {closeButton && <span onClick={onCancel}>{closeText}</span>}
        </div>
        <div className="center">
          {title}
        </div>
      </div>
    );

    if(inline){
      return (
        <div style={style} {...rest}>
          {toolbar}
          {createElement(keypad, props)}
        </div>
      )
    }

    return  (
      <Modal visible={visible}>
        {toolbar}
        {createElement(keypad, props)}
      </Modal>
    );

  }
}
