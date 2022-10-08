import React from 'react';
import './style.css';
import { useState, useEffect } from 'react';
import { NumericFormat } from 'react-number-format';

function App() {
  const [previousState, setPreviousState] = useState('');
  const [currentState, setCurrentState] = useState('');
  const [input, setInput] = useState('0');
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState(false);

  const inputNum = (e) => {
    if (currentState.includes('.') && e.target.innerText === '.') return;
    if (total) {
      setPreviousState('');
    }

    currentState
      ? setCurrentState((pre) => pre + e.target.innerText)
      : setCurrentState(e.target.innerText);
    setTotal(false);
  };

  useEffect(() => {
    setInput(currentState);
  }, [currentState]);

  useEffect(() => {
    setInput('0');
  }, []);

  const operatorType = (e) => {
    setTotal(false);
    setOperator(e.target.innerText);
    if (currentState === '') return;
    if (previousState !== '') {
      equals();
    } else{
      setPreviousState(currentState);
    setCurrentState('');
    }
  };

  const equals = (e) => {
    if (e?.target.innerText === '=') {
      setTotal(true);
    }

    let cal;
    switch (operator) {
      case '/':
        cal = String(parseFloat(previousState) / parseFloat(currentState));
        break;
      case '+':
        cal = String(parseFloat(previousState) + parseFloat(currentState));
        break;
      case 'X':
        cal = String(parseFloat(previousState) * parseFloat(currentState));
        break;
      case '-':
        cal = String(parseFloat(previousState) - parseFloat(currentState));
        break;
      default:
        return;
    }
    setInput('');
    setPreviousState(cal);
    setCurrentState('');
  };

  const minusPlus = () => {
    if (currentState.charAt(0) === '.') {
      setCurrentState(currentState.substring(1));
    } else {
      setCurrentState('-' + currentState);
    }
  };

  const percent = () => {
    previousState
      ? setCurrentState(String((parseFloat(curState) / 100) * previousState))
      : setCurrentState(String(parseFloat(currentState) / 100));
  };

  const reset = () => {
    setPreviousState('');
    setCurrentState('');
    setInput('0');
  };
  return (
    <div className="container">
      <div className="wrapper">
        <div className="screen">
          {input !== '' || input === '0' ? (
            <NumericFormat
              value={input}
              displayType={'text'}
              thousandSeperator={true}
            />
          ) : (
            <NumericFormat
              value={previousState}
              displayType={'text'}
              thousandSeperator={true}
            />
          )}
        </div>
        <div className="btn light-gray" onClick={reset}>
          AC
        </div>
        <div className="btn light-gray" onClick={percent}>
          %
        </div>
        <div className="btn light-gray" onClick={minusPlus}>
          +/-
        </div>
        <div className="btn orange" onClick={operatorType}>
          /
        </div>
        <div className="btn" onClick={inputNum}>
          7
        </div>
        <div className="btn" onClick={inputNum}>
          8
        </div>
        <div className="btn" onClick={inputNum}>
          9
        </div>
        <div className="btn orange" onClick={operatorType}>
          X
        </div>
        <div className="btn" onClick={inputNum}>
          4
        </div>
        <div className="btn" onClick={inputNum}>
          5
        </div>
        <div className="btn" onClick={inputNum}>
          6
        </div>
        <div className="btn orange" onClick={operatorType}>
          +
        </div>
        <div className="btn" onClick={inputNum}>
          1
        </div>
        <div className="btn" onClick={inputNum}>
          2
        </div>
        <div className="btn" onClick={inputNum}>
          3
        </div>
        <div className="btn orange" onClick={operatorType}>
          -
        </div>
        <div className="btn zero" onClick={inputNum}>
          0
        </div>
        <div className="btn" onClick={inputNum}>
          .
        </div>
        <div className="btn orange" onClick={equals}>
          =
        </div>
      </div>
    </div>
  );
}

export default App;
