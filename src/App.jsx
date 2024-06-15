import React from 'react'
import { useState, useEffect } from 'react'
import "./App.css"
import Pie from './Pie';
function App() {
  const [data, setData] = useState("hey");
  const [newData, setNewData] = useState("no")
  const [loading, setLoading] = useState(true)
  const [currentURL, setCurrentURL] = useState("")
  const [pieData, setPieData] = useState("")

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
                setCurrentURL(data)
                setPieData([["Sentiment", "Number of Comments"],["Positive Comments",responseData.positive.length], ["Negative Comments", responseData.negative.length]])
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
      <div className="middle-container">
    <h1>Sentiment Analysis</h1>
    <label htmlFor="">Please enter a reddit post url!</label>
    <input type="text" value={data} onChange={(e) =>setData(e.target.value)}/>
    <button onClick={sendData}> Send data</button>
    
    {!loading && 
      <>
      
        <p>For more details go to <a href={currentURL}> currentURL</a></p>
        <div className="three-columns">
          {[1, 2, 3].map((index) => (
            <div key ={index} >
              {index === 1 && newData.positive.length !== 0  ? (
              <div key ={index} className='three-comments' >
                <div className='comments'>
                  <h1>Positive Comments</h1>
                  {newData.positive.map((positiveItem, positiveIndex) => (
                    <div key={`positive-${positiveIndex}`} className='comment'>{positiveItem.content}</div>
                  ))}
                </div>
              </div>
            ) : index === 2 && newData.negative.length !== 0? (
              <div key ={index} className='three-comments' >
                <div className='comments'>
                  
                  <h1>Negative Comments</h1>
                  {newData.negative.map((negativeItem, negativeIndex) => (
                    <div key={`negative-${negativeIndex}`} className='comment'>{negativeItem.content}</div>
                  ))}
                </div>
              </div>
            ) : index === 3 && newData.neutral.length !== 0 && (
              <div key ={index} className='three-comments' >

                <div className='comments'>
                  <h1>Neutral Comments</h1>
                  {newData.neutral.map((neutralItem, neutralIndex) => (
                    <div key={`neutral-${neutralIndex}`} className='comment'>{neutralItem.content}</div>
                  ))}
                </div>
              </div>
            )}
              </div>
          ))}
        </div>
        <Pie data={pieData}/>

      </>
    }
    </div>
    </div>
  )
}

export default App