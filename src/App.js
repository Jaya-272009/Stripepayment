import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from "react-stripe-checkout"

function App() {

  const [product,setProduct] = useState({
    name:"react from FB",
    price:10,
    productBy:"facebook"
  });


  const makepayment= token =>{
    const body = {
      token,product
    }
    const headers={
      "Content-type":"application/json"
    }
    return fetch(`http://localhost:8282/payment`,{
      method:"POST",
      headers,
      body:JSON.stringify(body)
    }).then(response=> {
      console.log("RESPONSE",response)
      const {status} = response
      console.log("STATUS",status)
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckout 
        stripeKey={`pk_test_QzO0cjjSW0kdVTvCOwcRUUFv00pgwDr6m7`}
        token={makepayment}
        name="BUY REACT"
        amount={product.price}
        >
          <button className="btn-large blue">Buy react in just ${product.price}</button>

        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
