import Answer from "./Answer"

export default function Question(props){    
    var answer = []

    // Get answer data
    for(let i = 0; i < props.data.incorrect_answers.length; i++){
        answer.push(props.data.incorrect_answers[i].replace(/&quot;|&#039;|&rsquo;|&ldquo;|&rdquo;/g, "'").replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<").replace(/&oacute;/g, "ó").replace(/&aacute;/g, "á").replace(/&iacute;/g, "í").replace(/&eacute;/g, "é")
        .replace(/&eacute;/g, "é").replace(/&auml;/g, "ä").replace(/&ouml;/g, "ö").replace(/&aring;/g, "å"))
        if(i === props.data.incorrect_answers.length - 1){
            answer.push(props.data.correct_answer.replace(/&quot;|&#039;|&rsquo;|&ldquo;|&rdquo;/g, "'").replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<").replace(/&oacute;/g, "ó").replace(/&aacute;/g, "á").replace(/&iacute;/g, "í").replace(/&eacute;/g, "é")
            .replace(/&eacute;/g, "é").replace(/&auml;/g, "ä").replace(/&ouml;/g, "ö").replace(/&aring;/g, "å"))
        }
    }

    // Shuffle the array of answer data
    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    shuffle(answer)

    // Map and render the data
    answer = answer.map(data => {
        return(
            <Answer 
                key = {`ans${Math.floor(Math.random() * 100)}`}
                data = {data}
            />
        )
    })
    
    return(
        <div className="question d-flex flex-column my-3 border-bottom border-black">
            <div className="question--top">
                <h4 className="ask">{props.data.question.replace(/&quot;|&#039;|&rsquo;|&ldquo;|&rdquo;/g, "'").replace(/&amp;/g, "&").replace(/&eacute;/g, "é")}</h4>
            </div>
            <form className="answer d-flex flex-row my-4">
                {answer}
            </form>
        </div>
    )
}