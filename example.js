import React, {Component} from 'react';
import {render} from 'react-dom';
import {Keyboard, Enpad, Numpad} from './src';



class Example extends Component {

  state = {
    numpad: null
  }

  padHandler = (filed, status) => () =>{
    this.state[filed] = status;
    this.forceUpdate();
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>

        <input
          type="text"
          id="numInput"
          placeholder="numpad"
          style={{border: '1px solid #000'}}
          onClick={()=>this.setState({numpad: 'numInput'})}/>

      <br/>
        <input
          type="text"
          id="numInput2"
          placeholder="numpad2"
          style={{border: '1px solid #000'}}
          onClick={()=>this.setState({numpad: 'numInput2'})}/>

        <Keyboard
          currentId={this.state.numpad}
          number={true}
          onCancel={()=>this.setState({numpad: null})}
        />


      </div>
    );
  }
}


render(
  <Example/>,
  document.getElementById('root')
)
