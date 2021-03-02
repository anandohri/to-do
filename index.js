import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Numbers(props){
  return (
    <button className="numbers" onClick={props.onClick} value = {props.value} >
      {props.value}
    </button>
  );
}

function Functions(props){
  return (
    <button className="functions" onClick={props.onClick} value = {props.value}>
      {props.value}
    </button>
  );
}

function Clear(props){
  return (
    <button className="clear" onClick={props.onClick}>
      Clear
    </button>
  );
}

function Screen(props){
  const curr = props.operator === 'NA' ? props.num1 
                                        : props.operator === '=' ? props.num1.toString() + '='
                                                                  : props.num2;
  return (
    <textarea className="screen" value = {curr} />
  );
}

function History(props){
  const hist = props.operator === 'NA' ? props.num1 
                                        : props.operator === '=' ? props.hist.toString() 
                                                                    :props.num1.toString() + props.operator + props.num2.toString();
  return (
    <textarea className="history" value={hist} />
  );
}

class Calc extends React.Component{
  constructor(props){
    super(props);
    this.state = {nums: [0, 0],
                  operand: 0,
                  operator: 'NA',
                  hist: 'NA',
                  isFloat: [false, false]}
    this.renderNumber = this.renderNumber.bind(this);
    this.renderClear = this.renderClear.bind(this);
    this.renderFunction = this.renderFunction.bind(this);
    this.renderScreen = this.renderScreen.bind(this);
    this.renderHistory = this.renderHistory.bind(this);

    this.handleClear = this.handleClear.bind(this);
    this.handleFunction = this.handleFunction.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
    this.handleEquals = this.handleEquals.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    
  }

  renderNumber(i){
    return(
      i === '.' ? <Numbers value = {i} onClick={this.handleDecimal} />
                  : <Numbers value = {i} onClick={this.handleNumber} />
    );
  }

  renderFunction(i){
    return(
      i === '=' ? <Functions value = {i} onClick={this.handleEquals} />
                  : <Functions value = {i} onClick={this.handleFunction} />
    );
  }

  renderClear(){
    return(
      <Clear onClick={this.handleClear} />
    );
  }

  renderScreen(){
    return(
      <Screen num1 = {this.state.nums[0]} num2 = {this.state.nums[1]} operator = {this.state.operator} />
    );
  }

  renderHistory(){
    return(
      <History num1 = {this.state.nums[0]} num2 = {this.state.nums[1]} operator = {this.state.operator} hist = {this.state.hist} />
    );
  }

  handleClear(){
    this.setState({nums: [0, 0], operand: 0, operator: 'NA', hist: 'NA'})
  }

  handleNumber(props){
    let num = 0;
    if(this.state.operator === 'NA'){
      if(this.state.isFloat[0]){
        num = (this.state.nums[0] * 10) + parseInt(props.target.value);
        num = num * 0.1;
        this.setState({nums: [num, this.state.nums[1]]});
      }
      else{
        num = (this.state.nums[0] * 10) + parseInt(props.target.value);
        this.setState({nums: [num, this.state.nums[1]]});
      }
    }
    else{
      if(this.state.isFloat[1]){
        num = (this.state.nums[1] * 10) + parseInt(props.target.value);
        num = num * 0.1;
        this.setState({nums: [this.state.nums[0], num]})
      }
      else{          
        num = (this.state.nums[1] * 10) + parseInt(props.target.value);
        this.setState({nums: [this.state.nums[0], num]})
      }
    }
  }

  handleDecimal(){
    if(this.state.operator === 'NA'){
      this.setState({isFloat: [true, this.state.isFloat[1]]})
    }
    else{
      this.setState({isFloat: [this.state.isFloat[0], true]})
    }
  }

  handleFunction(props){
    if(this.state.operand === 0){
      this.setState({operand: 1, operator: props.target.value});
    }
    else{
      const numbers = this.state.nums.slice();
      this.compute(numbers);
      this.setState({operator: props.target.value});
    }
  }

  handleEquals(){
    if(this.state.operand === 1){
      const numbers = this.state.nums.slice();
      const prev = numbers[0].toString() + this.state.operator + numbers[1].toString()
      this.compute(numbers);
      this.setState({operator: '=', hist: prev});
    }
  }

  compute(numb){
    if(this.state.operator === '+'){
      numb[0] = numb[0] + numb[1];
      numb[1] = 0;
      this.setState({nums: numb})
    }
    else if(this.state.operator === '-'){
      numb[0] = numb[0] - numb[1];
      numb[1] = 0;
      this.setState({nums: numb})
    }
    else if(this.state.operator === '*'){
      numb[0] = numb[0] * numb[1];
      numb[1] = 0;
      this.setState({nums: numb})
    }
    else if(this.state.operator === '/'){
      numb[0] = numb[0] / numb[1];
      numb[1] = 0;
      this.setState({nums: numb})
    }
  }

  render(){
    return(
      <div className="calc">
        <div className="board-row">
          {this.renderHistory()}
        </div>
        <div className="board-row">
          {this.renderScreen()}
        </div>
        <div className="board-row">
          {this.renderNumber(7)}
          {this.renderNumber(8)}
          {this.renderNumber(9)}
          {this.renderFunction('/')}
        </div>
        <div className="board-row">
          {this.renderNumber(4)}
          {this.renderNumber(5)}
          {this.renderNumber(6)}
          {this.renderFunction('*')}
        </div>
        <div className="board-row">
          {this.renderNumber(1)}
          {this.renderNumber(2)}
          {this.renderNumber(3)}
          {this.renderFunction('-')}
        </div>
        <div className="board-row">
          {this.renderNumber(0)}
          {this.renderNumber('.')}
          {this.renderFunction('=')}
          {this.renderFunction('+')}
        </div>
        <div className="board-row">
          {this.renderClear()}
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Calc />,
  document.getElementById('root')
);