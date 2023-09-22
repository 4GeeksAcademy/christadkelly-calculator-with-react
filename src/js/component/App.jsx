import React, { useState, useRef } from "react";
import Button from "./Button";

const App = () => {
    const [displayValue, setDisplayValue] = useState('0');
    const resultValue = useRef(0);
    const aggValue = useRef(0);
    const currentOp = useRef(null);

    const calculate = () => {
        if(currentOp.current === '+') {
            resultValue.current = aggValue.current + resultValue.current;
        } if(currentOp.current === '-') {
            resultValue.current = aggValue.current - resultValue.current;
        } if(currentOp.current === '/') {
            resultValue.current = aggValue.current / resultValue.current;
        } if(currentOp.current === 'X') {
            resultValue.current = aggValue.current * resultValue.current;
        } if(currentOp.current === '%') {
            resultValue.current = aggValue.current % resultValue.current;
        }
        aggValue.current = 0;
        currentOp.current = null;
        setDisplayValue(resultValue.current.toString());
    }

    const buttonHandler = (input) => {
        switch(input) {
            case 'AC':
                resultValue.current = 0;
                aggValue.current = 0;
                currentOp.current = null;
                setDisplayValue(resultValue.current.toString());
            break;
            case '+/-':
                resultValue.current = (resultValue.current * -1);
                setDisplayValue(resultValue.current.toString());
            break;
            case '%':
                setOp('%');
            break;
            case '/':
                setOp('/');
            break;
            case 'x':
                setOp('X');
            break;
            case '-':
                setOp('-');
            break;
            case '+':
                setOp('+');
            break;
            case '=':
                calculate();
            break;
            case '.':
                setDisplayValue(displayValue + '.')
            break;
            default:        
                const displayResult = displayValue === '0' ? input : displayValue + input;
                resultValue.current = parseFloat(displayResult);
                setDisplayValue(resultValue.current.toString());
            break;
        }
    }

    const setOp = (op) => {
        aggValue.current = resultValue.current;
        resultValue.current = 0;
        currentOp.current = op;
        setDisplayValue('0');
    }

    const calculatorButtons = [
        ['AC', '+/-', '%', '/'],
        ['7','8','9','x'],
        ['4','5','6','-'],
        ['1','2','3','+'],
        ['0','.','=']  
    ];

    const gridResult = calculatorButtons.map((rowData, rowIdx, rowArr) => {
        return(
            <div className="row" key={rowIdx}>
            {rowData.map((colData, colIdx) => {
                const className = (rowIdx === (rowArr.length - 1) && colIdx === 0 ? 'col-6' : 'col-3')
                    return (
                        <div className={className} key={colIdx}>
                            <Button buttonValue={colData} buttonHandler={buttonHandler} />
                        </div>
                    )
                })
            }
            </div>
        )
    });

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">{displayValue}</div>
            </div>
            {gridResult}
        </div>
    )
};

export default App;