import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './numpad.less';

export default class Numpad extends Component {

  static uiName = 'Numpad';

  static propTypes = {
    className: PropTypes.string,
    dot: PropTypes.bool,
    onChange: PropTypes.func,
    random: PropTypes.bool,
    idCard: PropTypes.bool,
    maxLength: PropTypes.number,
    value: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired
    ]).isRequired,
  }

  static defaultProps = {
    closeButton: false
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

  renderKeys = (key) => {
    const keyCss = classnames({
      [styles['picker-keypad-button']]: true,
      [styles['picker-keypad-dummy-button']]: key === null,
      [styles['picker-keypad-delete']]: key === 'del'
    });

    let result = null;

    switch (key) {
      case null:
        break;
      case 'close':
        result = <div className={styles['picker-keypad-button-close']}></div>;
        break;
      case 'del':
        result = ( <div className={styles['icon-keypad-delete']}></div> );
        break;
      default:
        result = ( <div className={styles['picker-keypad-button-number']}>{key}</div> )
    }

    const valueFormat = (value , key, maxLength)=>{
      let val = String(value);
      key = String(key);

      if(key === 'del'){
        return val.slice(0, val.length - 1);
      }

      if(maxLength && val.length >= maxLength) {
        return val;
      }

      if(key === 'X'){
        return val + key;
      }

      if(key === '.' && val.indexOf('.') > -1){
        return val;
      }

      return val + key ;
    }

    const keyChange = ()=>{
      const maxLength = this.props.maxLength;
      const onChange = this.props.onChange;
      const value = this.props.value;

      if(typeof key === 'number' || key=== 'del' || key === '.' || key === 'X'){
        const val = valueFormat(value, key , maxLength);
        if(value != val){
          onChange && onChange(val);
        }

      }else if(key === 'close'){
        onCancel && onCancel();
      }
    }

    return (
      <div className={keyCss} key={key} onClick={keyChange}>{result}</div>
    );
  }

  componentWillMount() {
    const {closeButton, random, dot, idCard} = this.props;
    if(closeButton){
      this.keys = this.getkeys(['close','del'], random);
    }else if(dot){
      this.keys = this.getkeys(['.', 'del'], random);
    }else if(idCard) {
      this.keys = this.getkeys(['X', 'del'], random);
    }else{
      this.keys = this.getkeys([null, 'del'], random);
    }
  }

  render() {

    const {
      children,
      className,
      closeButton,
      dot,
      inline,
      idCard,
      maxLength,
      onChange,
      ...rest
    } = this.props;


    const cls = classnames({
      [styles['picker-keypad']]: true,
      [styles['picker-keypad-type-numpad']]: true,
      [styles['picker-modal-inline']]: inline
    }, className);

    return (
      <div className={styles['picker-keypad-buttons']} {...rest}>
        {this.keys.map(this.renderKeys)}
      </div>
    );

    // <PickerModal
    //   className={cls}
    //   innerCss={styles['picker-keypad-buttons']}
    //   mounter={!inline}
    //   visible={inline || visible}
    //   overlay={false}
    //   {...rest}
    //   >
    //   {this.keys.map(this.renderKeys)}
    // </PickerModal>
  }
}
