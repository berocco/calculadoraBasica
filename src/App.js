import React, { Component } from "react";
import "./App.css";
import { Button } from "./components/Button";
import { Display } from "./components/Display";
import { AuxDisplay } from "./components/AuxDisplay";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      virgula: false,
      display: "",
      auxdisplay: "",
      operacao: ""
    };
  }
  vaiBotao = val => {
    if (this.state.display === "erro"){
      this.setState({ display: val, auxdisplay: "", virgula: "", operacao: ""});
    }
    else{
      if (val === "," && this.state.virgula){
        this.setState({ display: "erro", auxdisplay:"", virgula:false, operacao: ""});
      }
      else if (val === ","){
        this.setState({display: this.state.display + val, virgula: true});
      }
      else{
      this.setState({ display: this.state.display + val });
      }
    }
  };
  vaiOperacao = val => {
    if (val === "AC"){
      this.setState({ auxdisplay: "", display: "", virgula: false})
    }
    else if(this.state.operacao !== ""){
      this.setState({ display: "erro", auxdisplay:"", virgula:false, operacao: ""}); 
    }
    else{
    this.setState({ auxdisplay: this.state.display, display: "", virgula: false, operacao: val})
  }
  };
  fazConta = val => {
    if (this.state.operacao === '' || this.state.display === '' || this.state.auxdisplay === "" ){
      this.setState({ display: "erro", auxdisplay:"", virgula:false, operacao: ""});
    }
    else{
      var resultado = '';
      var num1 = parseFloat(this.state.auxdisplay.replace(',','.'));
      var num2 = parseFloat(this.state.display.replace(',','.'));
      if (this.state.operacao === "+"){
        resultado = num1+num2
      }
      else if (this.state.operacao === '-'){
        resultado = num1-num2
      }
      else if (this.state.operacao === 'x'){
        resultado = num1*num2
      }
      else if (this.state.operacao === '÷'){
        resultado = num1/num2
      };
    console.log(resultado);
    this.setState({ auxdisplay:'', display: String(resultado).replace('.',','), virgula: false, operacao: ''})
  }
  };


  render() {
    return(
      <div className="app">  
        <div className="column">
          <div className="header">      
            <h1>Calculadora Simples</h1>
            <h5>Bernardo Moredo Rocco - 10706145</h5>
          </div>
          <div className="calculator">
            <AuxDisplay auxdisplay={this.state.auxdisplay+this.state.operacao}/>
            <Display display={this.state.display}/>
            <div className="buttons">
              <Button handleClick={ this.vaiBotao }>7</Button>
              <Button handleClick={ this.vaiBotao }>8</Button>
              <Button handleClick={ this.vaiBotao }>9</Button>
              <Button handleClick={ this.vaiOperacao }>+</Button>
            </div>
            <div className="buttons">
              <Button handleClick={ this.vaiBotao }>4</Button>
              <Button handleClick={ this.vaiBotao }>5</Button>
              <Button handleClick={ this.vaiBotao }>6</Button>
              <Button handleClick={ this.vaiOperacao }>-</Button>
            </div>
            <div className="buttons">
              <Button handleClick={ this.vaiBotao }>1</Button>
              <Button handleClick={ this.vaiBotao }>2</Button>
              <Button handleClick={ this.vaiBotao }>3</Button>
              <Button handleClick={ this.vaiOperacao }>x</Button>
            </div>
            <div className="buttons">
              <Button handleClick={ this.vaiOperacao }>AC</Button>
              <Button handleClick={ this.vaiBotao }>0</Button>
              <Button handleClick={ this.vaiBotao }>,</Button>
              <Button handleClick={ this.vaiOperacao }>÷</Button>
            </div>
            <div className="buttons">
              <Button handleClick={ this.fazConta }>=</Button>
            </div>
        </div>
        </div>
      </div>
    );
  }
}

export default App;
