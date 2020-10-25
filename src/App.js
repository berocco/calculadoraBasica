import React, { Component } from "react";
import "./App.css";
import { Button } from "./components/Button";
import { Display } from "./components/Display";
import { AuxDisplay } from "./components/AuxDisplay";
import Memory from "./components/Memory";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "",
      auxdisplay: "",
      operacao: "",
      memoria: [],
      maxID: 0
    };
  }
  vaiBotao = val => {
    if (this.state.display === "erro"){
      this.setState({ display: val, auxdisplay: "", operacao: ""});
    }
    else{
      if (val === "," && this.state.display.includes(',')){
        this.setState({ display: "erro", auxdisplay:"", operacao: ""});
      }
      else{
      this.setState({ display: this.state.display + val });
      }
    }
  };
  vaiOperacao = val => {
    if (val === "AC"){
      this.setState({ auxdisplay: "", display: ""})
    }
    else if(this.state.operacao !== ""){
      this.setState({ display: "erro", auxdisplay:"", operacao: ""}); 
    }
    else{
    this.setState({ auxdisplay: this.state.display, display: "", operacao: val})
  }
  };
  fazConta = val => {
    if (this.state.operacao === '' || this.state.display === '' || this.state.auxdisplay === "" ){
      this.setState({ display: "erro", auxdisplay:"", operacao: ""});
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
    this.setState({ auxdisplay:'', display: String(resultado).replace('.',','), operacao: ''})
  }
  };
  fazMemoria = val => {
    var id = val.slice(2);
    var op = val.slice(0,2);
    var memoria = this.state.memoria;
    var maxID = this.state.maxID
    if (op === "MS"){
      memoria.push({id: maxID + 1, val: this.state.display})
      this.setState({memoria: memoria, maxID: maxID+1})
    }
    if (op === "MC" && !id){
      this.setState({memoria: [], maxID: 0})
    }
    if (op === "MC" && id){
      if (parseInt(id) === maxID){
      }
      memoria = memoria.filter(item => item.id !== parseInt(id));
      this.setState({memoria: memoria})
    }
    if (op === "MR" && !id){
      if (memoria.length >= 1) {
      this.setState({display: memoria[memoria.length-1].val})
    }
    }
    if (op === "MR" && id){
      this.setState({display: memoria.find(item => item.id === parseInt(id)).val})
    }
    if (op === "M+"){
      if (memoria.length >= 1) {
      var sum = parseFloat(memoria[memoria.length-1].val.replace(',','.')) + parseFloat(this.state.display.replace(',','.'));
      this.setState({display: String(sum).replace('.', ',')})
      }
    }
  };

  render() {
    return(
      <div className="app"> 
        <div className="row">
          <div className="header">      
            <h1>Calculadora Simples</h1>
            <h5>Bernardo Moredo Rocco - 10706145</h5>
          </div>
          <div className="container">
            <div className="column-left">     
              <div className="calculator">
                <AuxDisplay auxdisplay={this.state.auxdisplay+this.state.operacao}/>
                <Display display={this.state.display}/>
                <div className="buttons">
                  <Button handleClick={ this.fazMemoria }>MC</Button>
                  <Button handleClick={ this.fazMemoria }>MR</Button>
                  <Button handleClick={ this.fazMemoria }>M+</Button>
                  <Button handleClick={ this.fazMemoria }>MS</Button>
                </div>
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
            <div className='column-right'>
              <h2 className="header">Memória</h2>
            
            {this.state.memoria.reverse().map((item) =>
              <Memory key={item.id} item={item} handleClick={ this.fazMemoria }/>
            )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
