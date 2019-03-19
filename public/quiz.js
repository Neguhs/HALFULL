
// Grab elements 
let quizbutton = document.getElementById('quizbtn');
let dashboard = document.getElementById('dashboard');
let greetingContainer = document.getElementById('greeting-container');
let sidebar = document.getElementById('sidebar');
let quizForm = document.getElementById('quizform-container');


quizbutton.addEventListener('click',() => {
    dashboard.style.animationPlayState = 'running';
    setTimeout(() => {
        dashboard.style.display = 'none';
        quizForm.style.display = 'block';
    }, 1000)
})

// Animate page to show quiz 

