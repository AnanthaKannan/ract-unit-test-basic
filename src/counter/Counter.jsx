import React, {useState, useEffect} from 'react'

export default function Counter() {

    const [counterValue, setCounterValue] = useState(0);
    const [inputValue, setInputValue] = useState(1);
    const [className, setClassName] = useState("")

    const counter = (status) => {
        if(status === 'add'){
            setCounterValue(inputValue + counterValue)
        }
        else{
            setCounterValue(counterValue - inputValue)
        }
    }

    useEffect(() => {
        if(counterValue >= 100){
            setClassName('bg-success')
        }
        else if(counterValue <= -100){
            setClassName('bg-danger')
        }
        else{
            setClassName('')
        }
    },[counterValue])

    return (
        <div>
            <h2 data-testid='header'>My Counter</h2>
            <h3 
            className={className}
            data-testid='counter'
            >{counterValue}</h3>

            <button 
            data-testid='add-btn'
            onClick={() => counter('add')}
            >+</button>

            <input 
            className='App'
            type="number" 
            data-testid='input' 
            value={inputValue}
            onChange={(e) => setInputValue(Number(e.target.value))} />

            <button 
            data-testid='sub-btn' 
            onClick={() => counter('sub')}>-</button>

        </div>
    )
}
