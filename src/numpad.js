import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './style.less';
import {backspace, shift, shift2} from './svgicon';

export default class Numpad extends Component {

  static uiName = 'Numpad';

  static propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    random: PropTypes.bool,
    dark: PropTypes.bool,
    extraKey: PropTypes.any,
    maxLength: PropTypes.number,
    value: PropTypes.string.isRequired,
  }

  static defaultProps = {
    value : '',
    extraKey: '00',
    dark: false
  }

  getkeys = (extraKeys, random) =>{
    let keys = [1,2,3,4,5,6,7,8,9,0];

    if(random){
      keys.sort(function(){ return 0.5 - Math.random() });
    }

    keys.splice(keys.length - 1, 0 , extraKeys[0])
    keys.push(extraKeys[1]);

    return keys;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.dark != this.props.dark){
      return true;
    }
    return false;
  }

  renderKeys = (key) => {
    let btn = key;

    if(btn === 'del'){
      btn = backspace;
    }

    const valueFormat = (value , key, maxLength)=>{
      let val = String(value);
      key = String(key);

      if(key === 'del'){ return val.slice(0, val.length - 1); }

      if(maxLength && val.length >= maxLength) { return val; }

      if(key === 'x'){ return val + key; }

      if(key === '00' && val === ''){ return ''; }

      if(key === '.'){
        if(val.indexOf('.') > -1){ return val; }
        if(val === ''){ return '0.'+ val; }
      }

      return val + key ;
    }

    const keyChange = ()=>{
      const maxLength = this.props.maxLength;
      const onChange = this.props.onChange;
      const value = this.props.value;
      if(typeof key === 'number' || typeof key === 'string' || key=== 'del' ){
        const val = valueFormat(value, key , maxLength);
        if(value != val){
          onChange && onChange(val);
        }

      }else if(key === 'close'){
        onCancel && onCancel();
      }
    }

    const specialkey = (key)=>{

      if(key === 'del'){
        return `${styles['specialkey']} ${styles['backspace']} ` +  (this.props.extraKey === null ? styles['transparent'] : '');
      }
      if(key === null){
        return `${styles['specialkey']} ${styles['block']}`;
      }
      return '';
    }


    return (
      <button key={key} onClick={keyChange} className={specialkey(key)}>{btn}</button>
    );
  }

  componentWillMount() {
    const {random, extraKey} = this.props;
    this.keys = this.getkeys([extraKey, 'del'], random);
  }

  render() {

    const {
      children,
      className,
      dark,
      extraKeys,
      maxLength,
      onChange,
      ...rest
    } = this.props;

    const List = ({keys})=>{
      const css = `${styles['iphone-keyboard']} ${styles['numpad']} ${dark? styles['theme-dark']: ''}`;
      const result = [];
      keys.forEach((k, i)=>{
        if(i%3 === 0){ result.push(<li key={`${i},${i + 3}`}>{keys.slice(i, i + 3)}</li>); }
      });
      return <ul className={css}>{result}</ul>;
    }

    return <List keys={this.keys.map(this.renderKeys)}/>;

  }
}
