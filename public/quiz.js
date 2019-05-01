
// Grab elements 
let quizbutton = document.getElementById('quizbtn');
let dashboard = document.getElementById('dashboard');
let greetingContainer = document.getElementById('greeting-container');
let sidebar = document.getElementById('sidebar');
let quizForm = document.getElementById('quizform-container');
let currentQ = document.getElementById('currentQuestion');
let qTracker = document.getElementById('questiontracker');
let resultbtn = document.getElementById('resultbtn');
let resultform = document.getElementById('resultform-container');
let resultlist = document.querySelector('.result-list');

console.log(resultbtn);





// Animate page to show quiz 
quizbutton.addEventListener('click',() => {
    dashboard.style.animationPlayState = 'running';
    setTimeout(() => {
        dashboard.style.display = 'none';
        quizForm.style.display = 'block';
    }, 1000)
});

// Quiz Prompts 
let questions = [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless",
    "Trouble falling or staying asleep, or sleeping too much",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Thoughts that you would be better off dead, or of hurting yourself",
    "Feeling bad about yourself - or that you are a failure or have let yourself or your family down"
]


// Display questions
let i = 0;
let total = 0;
currentQ.textContent = questions[i]
qTracker.innerHTML = `Question ${i+1}/7 `;
let responsebtn = document.querySelectorAll("#responsebtn");
responsebtn.forEach((response) => {
    response.addEventListener('click',() => {
        if(i >= questions.length - 1  ) {
        resultbtn.style.animationPlayState = 'running';
        resultbtn.style.display = 'block';
        } else {
        i++;
        currentQ.innerHTML = `${questions[i]}`;
        qTracker.innerHTML = `Question ${i+1}/7`;
        newResponse = parseFloat(response.value);
        total += newResponse;
        console.log(total);
        }
    })
})



// Total users results

resultbtn.addEventListener('click', () => {
    quizForm.style.display ='none';
    resultform.style.display = 'block';
    if(total <= 10){
        lowScore();
    } if(total > 10 && total <=20){
        medScore();
    } if(total > 20 && total <= 30){
        highScore();
    }
    
});



const lowScore = () => {
    const suggestions = [
        "1. You can reach one of our specialist here!",
        "2. Depression can happen to any of us! If things change feel free to retake the quiz"
    ]
    let summary = document.getElementById('summary');
    summary.textContent = "Seems like you maybe feeling down, Here is how we can help";
    let quote = document.getElementById('quote');
    quote.textContent =    "\"That is all I want in life: for this pain to seem purposeful\". ― Elizabeth Wurtzel, Prozac Nation";
    suggestions.forEach((item) => {
        let list = document.createElement("li");
        list.innerHTML = `${item}`;
        resultlist.append(list);
 })


   }
const medScore = () => {
    const suggestions = [
        "1. Speak to one of our therapist here",
        "2. Have you spoken to your primary physican about how you've been feeling ?",
        "3. Fighting depression on your own can be hard."
    ]
    let summary = document.getElementById('summary');
    summary.textContent = "Seems like you're  maybe feeling down , here's how we can help";
    let quote = document.getElementById('quote');
    quote.textContent = "\You're not a bad person for the ways you tried to kill your sadness.\”"
    suggestions.forEach((item) =>{
        let list = document.createElement("li");
        list.innerHTML = `${item}`;
        resultlist.append(list);
    })
}

const highScore = () => {
    const suggestions = [
        "1. Please contact one of our therapist",
        "2. We recommend you speak with your doctor on how you're feeling",
        "3. Fighting depression on your own can be hard."
    ]
    let summary = document.getElementById('summary');
    summary.textContent = "Seems like you’ve been feeling really down, here’s how we can help";
    let quote = document.getElementById('quote');
    quote.textContent = "\“I am bent, but not broken. I am scarred, but not disfigured. I am sad, but not hopeless. I am tired, but not powerless. I am angry, but not bitter. I am depressed, but not giving up.\”"
    suggestions.forEach((item) =>{
        let list = document.createElement("li");
        list.innerHTML = `${item}`;
        resultlist.append(list);
    })
}