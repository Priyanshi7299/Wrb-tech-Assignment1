const quizData = [
    {
        question: "What HTML element is used to create a container for all form elements?",
        options: ["<container>", "<form>", "<input>", "<section>"],
        correct: 1,
        explanation: "The <form> element is used to create a container for all form elements."
    },
    {
        question: "Which attribute of the <form> element specifies the URL where the form data will be submitted?",
        options: ["action", "method", "target", "enctype"],
        correct: 0,
        explanation: "The 'action' attribute of the <form> element specifies the URL where the form data will be submitted."
    },
    {
        question: "Which HTTP method is suitable for sending sensitive information like passwords or credit card details?",
        options: ["GET", "POST", "PUT", "DELETE"],
        correct: 1,
        explanation: "The 'POST' method is suitable for sending sensitive information as it sends data in the request body, making it hidden from the URL."
    },
    {
        question: "What attribute of the <input> element makes the input field mandatory?",
        options: ["required", "optional", "mandatory", "necessary"],
        correct: 0,
        explanation: "The 'required' attribute of the <input> element makes the input field mandatory, requiring the user to fill it in before submitting the form."
    },
    {
        question: "Which HTML element allows users to input multi-line text?",
        options: ["<input>", "<textarea>", "<select>", "<textfield>"],
        correct: 1,
        explanation: "The <textarea> element allows users to input multi-line text."
    },
    {
        question: "How many visible text lines are specified using the 'rows' attribute of the <textarea> element?",
        options: ["cols", "rows", "lines", "size"],
        correct: 1,
        explanation: "The 'rows' attribute of the <textarea> element specifies the number of visible text lines."
    },
    {
        question: "What HTML element creates a dropdown list for selecting options?",
        options: ["<select>", "<dropdown>", "<options>", "<list>"],
        correct: 0,
        explanation: "The <select> element creates a dropdown list for selecting options."
    },
    {
        question: "Which attribute of the <option> element defines the value associated with the option?",
        options: ["label", "text", "value", "option"],
        correct: 2,
        explanation: "The 'value' attribute of the <option> element defines the value associated with the option."
    },
    {
        question: "What type of button is represented by the <button> element with type='submit'?",
        options: ["Reset", "Submit", "Button", "Cancel"],
        correct: 1,
        explanation: "The <button> element with type='submit' represents a submit button, which is used to submit the form data to the server."
    },
    {
        question: "What HTML element is used to define a label for an input element?",
        options: ["<input>", "<label>", "<text>", "<caption>"],
        correct: 1,
        explanation: "The <label> element is used to define a label for an input element."
    },
    {
        question: "Which attribute of the <label> element associates it with the corresponding input field?",
        options: ["link", "for", "id", "name"],
        correct: 1,
        explanation: "The 'for' attribute of the <label> element associates it with the corresponding input field using its 'id' attribute."
    },
    {
        question: "How can you make an input field read-only using HTML?",
        options: ["readonly='true'", "readonly='readonly'", "read-only='yes'", "read-only='readonly'"],
        correct: 1,
        explanation: "You can make an input field read-only by using the 'readonly' attribute set to 'readonly'."
    },
    {
        question: "What is the purpose of the 'disabled' attribute in HTML input elements?",
        options: ["To hide the input field from the user", "To make the input field mandatory", "To prevent the user from interacting with the input field", "To style the input field differently"],
        correct: 2,
        explanation: "The 'disabled' attribute in HTML input elements is used to prevent the user from interacting with the input field, making it uneditable and unselectable."
    },
    {
        question: "Which HTML element is used to create a clickable button?",
        options: ["<click>", "<button>", "<link>", "<submit>"],
        correct: 1,
        explanation: "The <button> element is used to create a clickable button."
    },
    {
        question: "How can you create a checkbox input field in HTML?",
        options: ["<input type='radio'>", "<input type='checkbox'>", "<input type='text'>", "<input type='button'>"],
        correct: 1,
        explanation: "You can create a checkbox input field in HTML using the <input> element with the 'type' attribute set to 'checkbox'."
    }  
];


// JavaScript initialization
const questionEle = document.querySelector("#question");
const option_1 = document.querySelector("#option_1");
const option_2 = document.querySelector("#option_2");
const option_3 = document.querySelector("#option_3");
const option_4 = document.querySelector("#option_4");
const answerEles = document.querySelectorAll(".answer");
const submitBtn = document.querySelector("#submit");
let currentQuiz = 0;
let score = 0;


// Load quiz function
const loadQuiz = () => {
    const currentQuizData = quizData[currentQuiz];
    questionEle.innerText = currentQuizData.question;
    option_1.innerText = currentQuizData.options[0];
    option_2.innerText = currentQuizData.options[1];
    option_3.innerText = currentQuizData.options[2];
    option_4.innerText = currentQuizData.options[3];
};

loadQuiz();

// Get selected answer function on button click
const getSelectedOption = () => {
    let answer = undefined;
    answerEles.forEach((answerEle, index) => {
        if (answerEle.checked) {
            answer = index;
        }
    });
    return answer;
};

// Deselect answers
const deselectAnswers = () => {
    answerEles.forEach((answerEle) => {
        answerEle.checked = false;
    });
};

submitBtn.addEventListener('click', () => {
    const selectedOptionIndex = getSelectedOption();
    if (selectedOptionIndex === quizData[currentQuiz].correct) {
        score++;
    }
    currentQuiz++;
    if (currentQuiz < quizData.length) {
        loadQuiz();
        deselectAnswers();
    } else {
        // const quizContainer = document.querySelector("#quiz");
        // quizContainer.innerHTML = `
        //     <div class="result">
        //         <h2>Your Score: ${score}/${quizData.length}</h2>
        //         <p>Congratulations on completing the quiz!</p>
        //         <button class="reload button" onclick="location.reload()">Play Again</button>
        //     </div>
        // `
        
        const quizContainer = document.querySelector("#quiz");
        let resultHTML = '<div class="result">';
        resultHTML += `<h2>Your Score: ${score}/${quizData.length}</h2>`;
        resultHTML += "<h3>Correct Answers with Explanations:</h3>";
        quizData.forEach((question, index) => {
            const selectedOption = question.options[selectedOptionIndex];
            const correctOption = question.options[question.correct];
            resultHTML += `<p><strong>Question ${index + 1}:</strong> ${correctOption}`;
            if (selectedOptionIndex !== question.correct) {
                resultHTML += ` (Your answer: ${selectedOption})`;
            }
            resultHTML += `</p>`;
            resultHTML += `<p><em>${question.explanation}</em></p>`;
        });
        resultHTML += `<p>Congratulations on completing the quiz!</p>`;
        resultHTML += `<button class="reload button" onclick="location.reload()">Play Again</button>`;
        resultHTML += '</div>';
        quizContainer.innerHTML = resultHTML;
        ;
    }  
});
