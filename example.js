import React, {Component} from 'react';
import {render} from 'react-dom';
import {Keyboard, Enpad, Numpad} from './src';

const style = {
  padding: '10px 0'
}

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

  state = {
    dark: false
  }

  switchTheme = ()=>{
    this.setState({
      dark: !this.state.dark
    });
  }

  render() {
    return (


      <div>

        <div style={{paddingBottom: '10px'}}>
          <a onClick={this.switchTheme} style={{padding: '8px', border:'1px solid red'}}>切换主题</a>
        </div>

        <input
          type="text"
          id="numInput"
          placeholder="numpad"
          style={{border: '1px solid #000'}}
          onClick={()=>this.setState({numpad: 'numInput'})}/>

      <br/>


          <br/>
            <input
              type="text"
              id="numInput3"
              placeholder="numpad2"
              style={{border: '1px solid #000'}}
              onClick={()=>this.setState({numpad3: 'numInput3'})}/>

        <Keyboard
          dark={this.state.dark}
          input={this.state.numpad}
          number={false}
          onCancel={()=>this.setState({numpad: null})}
        />

        <Keyboard
          dark={this.state.dark}
          input={this.state.numpad3}
          extraKey={null}
          onCancel={()=>this.setState({numpad3: null})}
        />
      </div>
    );
  }
}


render(
  <Example/>,
  document.getElementById('root')
)
