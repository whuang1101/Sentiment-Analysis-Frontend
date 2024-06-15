import React from 'react'
import { useState, useEffect } from 'react'
import "./App.css"
import Pie from './Pie';
import ReactLoading from 'react-loading';
function App() {
  const [data, setData] = useState("hey");
  const [newData, setNewData] = useState("no")
  const [loading, setLoading] = useState(true)
  const[newLoading, setNewLoading] = useState(false)
  const [currentURL, setCurrentURL] = useState("")
  const [pieData, setPieData] = useState("")
  const [badLink, setBadLink] = useState(false)

    const sendData = async () => {
        setNewLoading(true)
        try {
            const response = await fetch(`http://127.0.0.1:5000/posts/${data}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                
            });

            if (response.ok) {
                const responseData = await response.json();
                setBadLink(false)
                setNewData(responseData)
                setLoading(false)
                setCurrentURL(data)
                setPieData([["Sentiment", "Number of Comments"],["Positive Comments",responseData.positive.length], ["Negative Comments", responseData.negative.length],["Neutral Comments", responseData.neutral.length]])
                console.log(responseData)
            } else {
                console.error('Error:', response.statusText);
                setBadLink(true)

            }
        } catch (error) {
            console.error('Error:', error);

        }
        finally {
          setNewLoading(false);
        }
    };
  return (
    <div className='border'>
      <div className="middle-container">
    <div className="header-container">


    <h1>Sentiment Analysis</h1>
    <label htmlFor="">Please enter a reddit post url!</label>
    <input type="text" value={data} onChange={(e) =>setData(e.target.value)}/>
    <button onClick={sendData}> Send data</button>
    {newLoading &&    
    <div className='loading'>
       <ReactLoading type={'spinningBubbles'} color={"white"} height={'30%'} width={'30%'} />
    </div>}{
      badLink &&
    <div className='bad-link'>
        URL does not follow the pattern "https://www.reddit.com/r/[subreddit]/comments/"
    </div>}
    </div>
    
    {!loading && 
      <>
        <h2>Currently looking at the sentiments of comments of "{newData.title}"</h2>
        <p>For more details go to <a href={currentURL}> {currentURL}</a></p>
        <Pie data={pieData}/>

        <div className="three-columns">
          {[1, 2, 3].map((index) => (
            <div key ={index} >
              {index === 1 && newData.positive.length !== 0  ? (
              <div key ={index} className='three-comments' >
                <div className='comments'>
                  <h1>Positive Comments</h1>
                  {newData.positive.map((positiveItem, positiveIndex) => (
                    <p key={`positive-${positiveIndex}`} className='comment'>{positiveItem.content}</p>
                  ))}
                </div>
              </div>
            ) : index === 2 && newData.negative.length !== 0? (
              <div key ={index} className='three-comments' >
                <div className='comments'>
                  
                  <h1>Negative Comments</h1>
                  {newData.negative.map((negativeItem, negativeIndex) => (
                    <p key={`negative-${negativeIndex}`} className='comment'>{negativeItem.content}</p>
                  ))}
                </div>
              </div>
            ) : index === 3 && newData.neutral.length !== 0 && (
              <div key ={index} className='three-comments' >
                <div className='comments'>
                  
                  <h1>Neutral Comments</h1>
                  {newData.neutral.map((neutralItem, neutralIndex) => (
                    <p key={`neutral-${neutralIndex}`} className='comment'>{neutralItem.content}</p>
                  ))}
                </div>
            </div>
            )}
              </div>
          ))}
        </div>

      </>
    }
    </div>
    </div>
  )
}

export default App