import { useState } from "react"

export default function Submit(){
    const [check, isChecked] = useState(true)
    const [res, setRes] = useState(0)
    var temp = JSON.parse(localStorage.getItem("answer"))
    let corr = 0

    const clickCheck = () => {        
        var question = document.getElementsByClassName("answer")
        isChecked(prevState => !prevState)

        if (JSON.parse(localStorage.getItem("boolArr") !== null)){
            var updateTemp = JSON.parse(localStorage.getItem("answer"))
            var boolArr = JSON.parse(localStorage.getItem("boolArr"))

            for (let i = 0; i < boolArr.length; i++){
                var boolAnswer = question[boolArr[i]].getElementsByClassName("ans--clicked")[0].innerHTML
                updateTemp[boolArr[i]] = boolAnswer
                localStorage.setItem("answer", JSON.stringify(updateTemp))
            }
            localStorage.removeItem("boolArr")
        }        

        if (check){
            var data = JSON.parse(localStorage.getItem("data"))
            var answer = JSON.parse(localStorage.getItem("answer"))

            for (let i = 0; i < answer.length; i++){
                answer[i] === data[i][data[i].length - 1] ? corr = +corr + 1 : corr = corr
            }
            setRes(prevRes => prevRes = corr)
            whichOne(data)            
        }
    }
    console.log(res)


    const whichOne = (data) => {
        const clicked = document.getElementsByClassName("ans--clicked")
        const notClicked = document.getElementsByClassName("ans")
        console.log(notClicked)      

        // Change to right answer if wrong answer selected
        for (let i = 0; i < clicked.length; i++){
            for (let j = 0; j < notClicked.length; j++){
                for (let k = 0; k < temp.length; k++){
                    if (temp[k] !== null){
                        notClicked[j].innerHTML === data[k][data[k].length - 1] ? notClicked[j].style.backgroundColor = "#F8F988" : ""
                    }
                }
            }
        }
    }

    return(
        <div className="submit d-flex flex-row justify-content-center align-items-center ">
            {check ? <button type="button" className="btn btn-outline-secondary" onClick={clickCheck}>CHECK</button>  
            : 
            <div className="d-flex flex-column">            
                <h4 className="mb-4">You got {res} questions correct!</h4>
                <button type="button" className="btn btn-outline-secondary" onClick={() => {location.reload()}}>TRY AGAIN?</button>
            </div>
            }
        </div>
    )
}