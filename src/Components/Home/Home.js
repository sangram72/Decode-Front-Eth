import React, { useState,useEffect } from 'react';
import axios from 'axios';
import '../Home/Home.css'
function Home() {

 
     



   
    const [rawTransaction, setRawTransaction] = useState('');
    const [decodedData, setDecodedData] = useState([]);
  
    const handleButtonClick = () => {
      if (rawTransaction) {
        // Decode transaction
        fetch('https://decode-transaction.vercel.app/decode', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ rawTransaction: rawTransaction })
        })
          .then(response => response.json())
          .then(data => {
            setDecodedData(prevData => [...prevData, data.data]);
  
            // Get all decoded data
            fetch('https://decode-transaction.vercel.app/data')
              .then(response => response.json())
              .then(data => {
                setDecodedData(data);
              })
              .catch(error => {
                console.error('Error:', error);
              });
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    };
    const clears = () => {   
        setRawTransaction('');
        setDecodedData('')
    }
    const [isTextareaActive, setTextareaActive] = useState(false);
    const handleTextareaClick = () => {
      setTextareaActive(true);
    };
  
    return (
      <div>
        <div id='div1'>
          <img id='img1' src={require('../../logo/logo.png')}/>
        {/* <button id='btn1'>Ethereum Raw Transaction Decoder</button> */}
        <h1 >Ethereum Raw Transaction Decoder</h1>
        </div>
      
        <div>
          <textarea
          className={isTextareaActive ? 'active' : ''}
            value={rawTransaction}
            id='text1'
            onChange={e => setRawTransaction(e.target.value)}
            onClick={handleTextareaClick}
        onBlur={() => setTextareaActive(false)}

            placeholder="Enter raw transaction data"
          ></textarea>
          <br />
          <div id='buttons'>
          <button onClick={handleButtonClick}
          disabled={!rawTransaction}>Decode and Get Data</button>
          <button onClick={clears}>Clear</button>
          </div>
        </div>
        <div className="decoded-data-section">
          <h2>Decoded Data:</h2>
          {decodedData.length > 0 ? (
                   <ul className="decoded-data-list">
                   {decodedData.map((data, index) => (
                <li key={index}>
                  <pre>{JSON.stringify(data, null, 2)}</pre>
                </li>
              ))}
            </ul>
          ) : (
            <p>No decoded data available.</p>
          )}
        </div>
      </div>
    );
  }
  




  


export default Home
