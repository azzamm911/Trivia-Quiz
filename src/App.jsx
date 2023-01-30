import { useState, useEffect } from "react"
import Question from "./Question"
import Submit from './Submit '

export default function App() {
  const [questions, setQuestion] = useState([])
  var question = []
  var dataAnswer = []
  var dataQuestion = []
  
  // Get the data from api
  useEffect(() => {
    var answerArr = [
      {      
      },
      {      
      },
      {      
      },
      {      
      },
      {      
      }
    ]
    localStorage.setItem("answer", JSON.stringify(answerArr))

    fetch("https://opentdb.com/api.php?amount=5")
      .then(res => res.json())
      .then(data => setQuestion(data.results))
  }, [])  

  if (questions.length > 0){
    for (let i = 0; i < questions.length; i++){
      var tempArr = []
      var tempQuestion = [questions[i].question.replace(/&quot;|&#039;|&rsquo;|&ldquo;|&rdquo;/g, "'").replace(/&amp;/g, "&").replace(/&eacute;/g, "é")]      

      for(let j = 0; j < questions[i].incorrect_answers.length; j++){
        tempArr.push(questions[i].incorrect_answers[j].replace(/&quot;|&#039;|&rsquo;|&ldquo;|&rdquo;/g, "'").replace(/&amp;/g, "&"))
        if (j === questions[i].incorrect_answers.length - 1){
          tempArr.push(questions[i].correct_answer.replace(/&quot;|&#039;|&rsquo;|&ldquo;|&rdquo;/g, "'").replace(/&amp;/g, "&"))
        }
      }

      dataQuestion.push(tempQuestion)
      dataAnswer.push(tempArr)
    }

    localStorage.setItem("data", JSON.stringify(dataAnswer))
    localStorage.setItem("question", JSON.stringify(dataQuestion))

    question = questions.map(data => {
      return(
        <Question 
          key = {Math.floor(Math.random() * 100 + 1)}
          data = {data}
        />
      )
    })
  }

  return (
    <div className="app d-flex flex-column w-50 my-5 mx-auto p-4 border border-dark rounded" style={{height: "fit-content"}}>
      {question.length > 0 && question}
      <Submit/>
    </div>
  )
}

