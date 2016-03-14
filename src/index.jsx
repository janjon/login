import React from 'react';
import { render } from 'react-dom';
import "bootstrap/dist/css/bootstrap.css";
import {Input, ButtonInput} from 'react-bootstrap';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {name:'',pass:'' };
    this.user = {name:'admin',pass:'111'};
    this.login = this.login.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
  }
  handleNameChange(event) {
    let st = this.state;
    st.name = event.target.value;
    this.setState(st);
  }
  
  handlePassChange(event) {
    let st = this.state;
    st.pass = event.target.value;
    this.setState(st);
  }
  
  login(){
    if(this.state.name===this.user.name && this.state.pass === this.user.pass){
      alert('成功');
    }  
    else{
      alert('失败');
    }
  }
  
  render(){
    return (
      <div className="container">
        <form className="form-horizontal">
          <Input type="text" label="名称:" labelClassName="col-xs-2" wrapperClassName="col-xs-10" onChange={this.handleNameChange} defaultValue={this.state.name} />
          <Input type="password" label="密码:" labelClassName="col-xs-2" wrapperClassName="col-xs-10" onChange={this.handlePassChange} defaultValue={this.state.pass} />
          <ButtonInput bsSize="small" onClick={this.login}>登陆</ButtonInput>
        </form>
      </div>
    );
  }
}

render(<App />, document.body);