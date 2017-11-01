import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import PropTypes from 'prop-types';
import {PickerModal} from 'f7-modal';
import Numpad from './numpad';
import Enpad from './enpad';

export default class Keyboard extends Component {

  static propTypes = {
    inline: PropTypes.bool,
    number: PropTypes.bool,
    getCancelIgnore: PropTypes.func
  }

  static defaultProps = {
    number: true
  }

  state = {
    visible: false,
    value: ''
  }

  input = null;

  visible = ()=> {

    this.setState({
      visible: true
    }, ()=>{
      this.input.scrollIntoViewIfNeeded();
    });
  }

  getInput = (currentId)=>{
    const {inputs} = this.props;
    const currentInput = document.getElementById(currentId);
    if(currentInput){
      currentInput.readOnly = true;
      document.activeElement.blur();
      this.setState({ visible: true, value: currentInput.value });
      this.input = currentInput;
    }else{
      this.setState({ visible: false, value: '' });
      this.input = null;
    }
  }


  componentDidMount() {
    this.getInput(this.props.currentId);
    if(!this.props.inline){
      document.addEventListener('click', this.cancelIgnore, false);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.currentId != this.props.currentId){
      this.getInput(nextProps.currentId)
    }
  }

  componentWillUnmount() {
    if(this.props.inline){
      document.removeEventListener('click', this.cancelIgnore, false);
    }
  }

  getElement = () => findDOMNode(this);

  getCancelIgnore= ()=>this.input;

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

    if (!result) {
      onCancel && onCancel();
    }

    return result;
  }

  render() {

    const {
      currentId,
      children,
      inputs,
      value,
      number,
      style,
      ...rest
    } = this.props;

    const setValue = (a)=>{
      this.setState({ value: a });
      this.input.value = a;
      this.input.scrollLeft = this.input.scrollWidth;
    }

    return (
      <PickerModal
        overlay={false}
        visible={this.state.visible}
        style={{position: 'fixed', height:'auto', ...style}}
        toolbar={null}
        {...rest}
        >
        {
          number ? (
            <Numpad
              value={this.state.value}
              onChange={setValue}/>
          ) : (
            <Enpad
              value={this.state.value}
              onChange={setValue}/>
          )
        }

      </PickerModal>
    )
  }
}
