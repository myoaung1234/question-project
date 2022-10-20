import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import axios from 'axios';
import './App.css';
let results = [];

function App() {
  const [datas, setDatas] = useState([]);
  const [step, setStep] = useState(0);
  const [correct, setCorrect] = useState(0)
  const [finish, setFinish] = useState(false)
  const [loading, setLoading] = useState(true)


  const dataResult = (e) => {
    e.preventDefault();
    if(step !== datas.length - 1){
      next()
      correctResult(step)
    } else {
      correctResult(step)
      setFinish(true)
      setStep(0)
    }
  }


  const next = () => {
    setStep(next => next + 1)
    
  }

  const correctResult = (step) => {
    if(results[step].ans === datas[step].answer) {
       setCorrect(correct + 1)
    }
  }

  const backResult = (step) => {
    if(results[step-1].ans === datas[step-1].answer) {
      setCorrect(correct - 1 )
    }
  }

  const playAgain = () => {
    setStep(0);
    results = [];
    setCorrect(0);
    setFinish(false)
  }

  const prev = (e) => {
    e.preventDefault()
    if(step !== 0){
      setStep(prev => prev - 1)
      backResult(step);
    }
  };

  const add = (e,id, step) => {
    results[step] = {id: id, ans: e.target.value}
  };

  const resultData = async () => {
    setLoading(true)
    const newData = await axios.get(`http://localhost:5000/questions`)
    setDatas(newData.data)
    setLoading(false) 
  };

  useEffect(() => {
      resultData()
  }, []);
  
  return (   
    <div className="container">
      {loading && <Loading />} 
      <form className='App' onSubmit={dataResult}>
        <h3>CATEGORY : MUSIC</h3>
          <span>{step + 1} / {datas.length}</span>
          <div className='question'>
            <h4>{datas[step]?.title}</h4>
          </div>
          { 
            datas[step]?.option.map(o => (
              <label className='answer' key={o}>
                <input type="radio" 
                name={datas[step].title} 
                value={o} onChange={e => 
                add(e, datas[step].id, step)} 
                required />
                <p>{o}</p>
              </label>
            ))
          }
          <div className='submit'>
            {
              step !== 0 && <button className='prev' type='submit' onClick={e => prev(e)}>Prev Question</button>
            }
            <button 
              className='next' 
              type='submit'
            >
              {step < (datas.length - 1) ? 'Next Question' : 'Check Result'}
            </button>
          </div>
      </form>
      {  
        finish && <div className='correct App' >
          <div className='correct-inner'>
            <h3>CONGRATULATION</h3>
            <p>You answered</p>
            <h3>{correct}/{datas.length}</h3>
            <p>questions correct</p>
            <button className='next' onClick={() => playAgain()}>Play again</button>
          </div>
      </div>
      }
    </div>
  );
}

export default App;


