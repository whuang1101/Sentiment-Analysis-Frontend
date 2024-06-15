import React from 'react'
import { useState, useEffect } from 'react'
import "./App.css"

function App() {
  const [data, setData] = useState("hey");
  const [newData, setNewData] = useState("no")
  const [loading, setLoading] = useState(true)

    const sendData = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/posts/${data}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                
            });

            if (response.ok) {
                const responseData = await response.json();
                setNewData(responseData)
                setLoading(false)
                console.log(responseData);
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
  return (
    <div className='border'>
    <h1>Sentiment Analysis</h1>
    <label htmlFor="">Please enter a reddit post url!</label>
    <input type="text" value={data} onChange={(e) =>setData(e.target.value)}/>
    <button onClick={sendData}> Send data</button>
    
    {!loading && 
      <>
        <h1>{newData.title}</h1>
        <div className="three-columns">
          {[1, 2, 3].map((index) => (
            <div key ={index} >
              {index === 1 ? (
              <div>
                <h1>Positive Comments</h1>
                {newData.positive.map((positiveItem, positiveIndex) => (
                  <div key={`positive-${positiveIndex}`}>{positiveItem.content}</div>
                ))}
              </div>
            ) : index === 2 ? (
              <div>
                <h1>Negative Comments</h1>
                {newData.negative.map((negativeItem, negativeIndex) => (
                  <div key={`negative-${negativeIndex}`}>{negativeItem.content}</div>
                ))}
              </div>
            ) : index === 3 ? (
              <div>
                {newData.neutral.length !== 0 &&
                <h1>Neutral Comments</h1>}
                {newData.neutral.map((neutralItem, neutralIndex) => (
                  <div key={`neutral-${neutralIndex}`}>{neutralItem.content}</div>
                ))}
              </div>
            ) : <div></div>}
              </div>
          ))}
        </div>
      </>
    }
    </div>
  )
}

export default App