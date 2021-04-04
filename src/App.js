import React from 'react';
import './App.css';

const URL = 'https://jsonplaceholder.typicode.com'

const AVAILABLE_RESOURCES = [
    'posts',
    'comments',
    'albums',
    'photos',
    'todos',
    'users',
]



function App() {

    //Task 1 (create select component, checkbox, radio) - controlled

    const [color, setColor] = React.useState('green');

    const [checkedTask, setCheckedTask] = React.useState(false);

    const [radio, setRadio] = React.useState('apple');

    //Task 2 - controlled

    const [endpoint, setEndpoint] = React.useState ('');
    const [itemId, setItemId] = React.useState('');

    const [errorMessage, setErrorMessage] = React.useState(null);

    const [items, setItems] = React.useState([]);
    const [singleElement, setSingleElement] = React.useState(null);

    //validation:
    const onSubmit = () => {
        if(!endpoint) {
            return setErrorMessage('first input is required')
        }
        if(!AVAILABLE_RESOURCES.includes(endpoint.trim().toLowerCase())) {
            return setErrorMessage('value is not valid, try to use smth else')
        }

        const idToNum = Number(itemId)

        if(!idToNum && itemId !== '' && idToNum !== 0) {
            return setErrorMessage('value for second input is not valid, please use numeric value')
        }

        if((idToNum < 1 || idToNum > 100) && itemId !== '') {
            return setErrorMessage('value for second input is out of range, please use 1-100')
        }

        handleSubmit()
        setErrorMessage('')
    }


    const handleSubmit = async () => {
        const response = await fetch(`${URL}/${endpoint.trim().toLowerCase()}/${itemId.trim()}`);
        const data = await response.json();

        if(itemId) {
            setSingleElement(data)
            setItems ([])
            return
        }
        setSingleElement(null)
        setItems (data)
    }


  return (
    <div className="App">
        {/*//Task 1*/}
          <label>
              Color is: {color}
              <br/>
              <select value={color} onChange={(e) => {setColor(e.target.value)}}>
                  <option value="green"> Green </option>
                  <option value="yellow"> Yellow </option>
                  <option value="black"> Black </option>
                  <option value="blue"> Blue </option>
              </select>
          </label>

        <br/>
            <h3>
                Done: {checkedTask ? "True" : "False"}
            </h3>
        <input type="checkbox" checked={checkedTask} onChange={(e) => {setCheckedTask(e.target.checked) }}/>

        <br/>
            <h4>My favorite fruit is: {radio}</h4>
        <br/>
            <labeL>Apple:</labeL>
        <input type="radio" checked={radio === "apple"}
        value="apple"
        onChange={(e) => {setRadio(e.target.value)}}/>
        <br/>
        <labeL>Orange:</labeL>
        <input type="radio" checked={radio === "orange"}
               value="orange"
               onChange={(e) => {setRadio(e.target.value)}}/>
        <br/>
        <labeL>Banana:</labeL>
        <input type="radio" checked={radio === "banana"}
               value="banana"
               onChange={(e) => {setRadio(e.target.value)}}/>
        <br/>

        {/*//Task 2*/}
        <>
            <br/>
            <br/>
        <input value={endpoint} onChange={({target: {value}}) => setEndpoint(value)} type="text" placeholder="enter data"/>
            <br/>
        <input value={itemId} onChange={({target: {value}}) => setItemId (value)} type="text" placeholder="enter number"/>
            <br/>
            <button onClick={onSubmit}> Submit </button>
        </>
        <hr/>
        <h1 style={{color:'red'}}>{errorMessage}</h1>
        <div style={{width: '400px', textAlign: 'left', padding: '20px'}}>
            {singleElement && JSON.stringify(singleElement, null, 2)}
        </div>
        <hr/>
        <div>
            {items.map(el => (<div>{el.id} - {el.title} </div>))}
        </div>
    </div>
  );
}

export default App;
