import './css/answer.css'
import { useState } from "react"

export default function Answer(props){
    const data = JSON.parse(localStorage.getItem("data"))
    const [click, isClicked] = useState(true)
    var boolArr =[]

    // Alter button if clicked (change color)
    const handleClick = () => {
        var temp = JSON.parse(localStorage.getItem("answer"))
        isClicked(prevState => !prevState)

        if (click){
            if (props.data !== "True" && props.data !== "False"){
                for (let i = 0; i < data.length; i++){
                    if(data[i].find(el => el === props.data)){
                        temp[i] = props.data
                        localStorage.setItem("answer", JSON.stringify(temp))
                        
                        const whichForm = document.getElementsByClassName("answer")[i].getElementsByClassName("ans")
                        for (let k = 0; k < whichForm.length; k++){
                            if (whichForm[k].innerHTML !== props.data){
                                whichForm[k].disabled = true
                            }
                        }
                    }
                }
            } else {
                // Get the index for boolean answer
                for (let l = 0; l < data.length; l++){
                    for (let m = 0; m < data[l].length; m++){
                        if (data[l][m] === "False" || data[l][m] === "True"){
                            boolArr.push(l)
                            localStorage.setItem("boolArr", JSON.stringify(boolArr))
                        }
                    }
                }
            }
        } else {
            if (props.data !== "True" && props.data !== "False"){
                for (let i = 0; i < data.length; i++){
                    if(data[i].find(el => el === props.data)){
                        temp[i] = {}
                        localStorage.setItem("answer", JSON.stringify(temp))
                        
                        const whichForm = document.getElementsByClassName("answer")[i].getElementsByClassName("ans")
                        for (let k = 0; k < whichForm.length; k++){
                            if (whichForm[k].innerHTML !== props.data){
                                whichForm[k].disabled = false
                            }
                        }
                    }
                }
            }
        }
    }

    return(
        <button type="button" className={click ? `ans btn btn-outline-secondary me-3` : `ans--clicked btn btn-outline-secondary me-3`}  onClick={handleClick}>{props.data}</button>
    )
}