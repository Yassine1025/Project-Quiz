import React, { useRef, useState } from 'react';
import './Quiz.css';
import { data } from './../data/data';

export default function Quiz() {
  const [index, setIndex] = useState(0);
  const [quest, setQuest] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [resultat, setResultat] = useState(false);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4];

  function checkAns(e, ans) {
    if (lock === false) {
      if (quest.ans === ans) {
        e.target.classList.add('correct');
        setLock(true);
        setScore(score + 1);
      } else {
        e.target.classList.add('wrong');
        setLock(true);
        option_array[quest.ans - 1].current.classList.add('correct');
      }
    }
  }

  function next() {
    if (lock === true) {
      if (index === data.length - 1) {
        setResultat(true);
        return;
      }

      setIndex(prevIndex => {
        const newIndex = prevIndex + 1;
        setQuest(data[newIndex]);
        return newIndex;
      });

      setLock(false);
      option_array.forEach(option => {
        option.current.classList.remove('wrong');
        option.current.classList.remove('correct');
      });
    }
  }

  function reset() {
    setIndex(0);
    setQuest(data[0]);
    setScore(0);
    setLock(false);
    setResultat(false);
  }

  return (
    <div className='container'>
      <h1>Quiz</h1>
      <hr />
      {resultat ? (
        <></>
      ) : (
        <>
          <h2>{index + 1}.{quest.question}</h2>
          <ul>
            <li ref={Option1} onClick={(e) => { checkAns(e, 1); }}>{quest.option1}</li>
            <li ref={Option2} onClick={(e) => { checkAns(e, 2); }}>{quest.option2}</li>
            <li ref={Option3} onClick={(e) => { checkAns(e, 3); }}>{quest.option3}</li>
            <li ref={Option4} onClick={(e) => { checkAns(e, 4); }}>{quest.option4}</li>
          </ul>
          <button onClick={next}>Next</button>
          <div className='index'>{index + 1} of {data.length} questions</div>
        </>
      )}
      {resultat ? (
        <>
          <h2>You Scored {score} out of {data.length}</h2>
          <button onClick={reset}>Reset</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
