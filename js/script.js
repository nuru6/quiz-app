// Selecting HTML Elements; Home;
let homePage = document.querySelector('.homePage'),
    homeBtnRight = document.querySelector('.homePage .btnR'),
    // Rules;
    rulesPage = document.querySelector('.rulesPage'),
    rulesBtnLeft = document.querySelector('.rulesPage .btnL'),
    rulesBtnRight = document.querySelector('.rulesPage .btnR'),
    // Quiz;
    quizPage = document.querySelector('.quizPage'),
    timeStatus = document.querySelector('.timeStatus'),
    timeCounter = document.querySelector('.timeCounter'),
    pBar = document.querySelector('.pBar'),
    question = document.querySelector('.question'),
    optionsDiv = document.querySelector('.options'),
    quizCounter = document.querySelector('.quizCounter'),
    quizBtnRight = document.querySelector('.quizPage .btnR'),
    // Result;
    resultPage = document.querySelector('.resultPage'),
    resultMsg = document.querySelector('.resultMsg'),
    resultBtnLeft = document.querySelector('.resultPage .btnL'),
    resultBtnRight = document.querySelector('.resultPage .btnR'),
    // Extras;
    tick = '<i class="fa-regular fa-circle-check"></i>',
    cross = '<i class="fa-regular fa-circle-xmark"></i>';
// Declaration of Variables;
let secondCount = 15,
    quizCount = 0,
    score = 0;
// Functions; Exit Function;
let exitFunc = x => {
    let y = document.querySelector(x);
    y.classList.add('d-none');
    homePage.classList.remove('d-none');
};
// Times Up Function;
let timesUp = () => {
    let optionLen = optionsDiv.children.length,
        correctAns = questions[quizCount].qAnswer;
    for (let i = 0; i < optionLen; i++) {
        optionsDiv.children[i].classList.add('disabled');
        if (optionsDiv.children[i].textContent == correctAns) {
            optionsDiv.children[i].classList.add('correct');
            optionsDiv.children[i].insertAdjacentHTML('beforeend', tick);
        }
    }
    quizBtnRight.classList.remove('d-none');
};
// Timer Function;
let timerFunc = x => {
    timeCounter.textContent = x;
    timeStatus.textContent = 'Times Left';
    secInterval = setInterval(() => {
        x--;
        x = (x < 10) ? '0' + x : x;
        if (x == 0) {
            timeStatus.textContent = 'Times Up';
            clearInterval(secInterval);
            timesUp();
        };
        timeCounter.textContent = x;
    }, 1000);
};
// Time bar Function;
let pBarFunc = x => {
    let i = 0;
    x *= 10; // x * 1000 / 100 = x * 10;
    pBar.style.width = i + '%';
    pBarInterval = setInterval(() => {
        i += 1 / 10;
        pBar.style.width = i + '%';
        if (i >= 100) {
            clearInterval(pBarInterval);
        };
    }, x / 10);
};
// Show Quiz Function;
let showQuizFunc = () => {
    // Button hide;
    quizBtnRight.classList.add('d-none');
    // Show Question;
    let qNum = questions[quizCount].qNum,
        qQuestion = questions[quizCount].qQuestion,
        quizQuestion = qNum + '. ' + qQuestion;
    question.innerHTML = quizQuestion;
    // Show Options;
    let options = '<div class="option" onclick="checkAns(this)">' + questions[quizCount].qOptions[0] + '</div>' + '<div class="option" onclick="checkAns(this)">' + questions[quizCount].qOptions[1] + '</div>' + '<div class="option" onclick="checkAns(this)">' + questions[quizCount].qOptions[2] + '</div>' + '<div class="option" onclick="checkAns(this)">' + questions[quizCount].qOptions[3] + '</div>';
    optionsDiv.innerHTML = options;
    // Current Quiz No;
    quizCounter.textContent = qNum + ' out of ' + questions.length;
};
// Check selected answer;
let checkAns = x => {
    clearInterval(secInterval);
    clearInterval(pBarInterval);
    x.classList.remove('hover');
    let ans = x.textContent,
        correctAns = questions[quizCount].qAnswer,
        optionLen = optionsDiv.children.length;
    //
    for (let i = 0; i < optionLen; i++) {
        optionsDiv.children[i].classList.add('disabled');
    };
    quizBtnRight.classList.remove('d-none');
    //
    if (ans == correctAns) {
        x.classList.add('correct');
        x.insertAdjacentHTML('beforeend', tick);
        score += 1;
    } else {
        x.classList.add('incorrect');
        x.insertAdjacentHTML('beforeend', cross);
        for (let i = 0; i < optionLen; i++) {
            if (correctAns == optionsDiv.children[i].textContent) {
                optionsDiv.children[i].classList.add('correct');
                optionsDiv.children[i].insertAdjacentHTML('beforeend', tick);
            }
        }
    }
};
// Result Function;
let resultFunc = () => {
    let msg;
    if (score > 3) {
        msg = 'Congratulations 😍';
    } else if (score > 1){
        msg = 'Carry On 😅'
    } else {
        msg = 'I am Sorry 😢'
    }
    resultMsg.textContent = `${msg} You got ${score} out of ${questions.length}`;
};

// Development; Home to Rules;
homeBtnRight.onclick = () => {
    homePage.classList.add('d-none');
    rulesPage.classList.remove('d-none');
};
// Rules to Home;
rulesBtnLeft.onclick = () => {
    exitFunc('.rulesPage');
};
// Rules to Quiz;
rulesBtnRight.onclick = () => {
    // Page Change;
    rulesPage.classList.add('d-none');
    quizPage.classList.remove('d-none');
    // Start Timer;
    timerFunc(secondCount);
    // Start Time Bar;
    pBarFunc(secondCount);
    // Show Quiz;
    showQuizFunc();
};
// Quiz Change;
quizBtnRight.onclick = () => {
    if (quizCount < questions.length - 1) {
        quizCount++;
        // Start Timer;
        timerFunc(secondCount);
        // Start Time Bar;
        pBarFunc(secondCount);
        // Show Quiz;
        showQuizFunc();
    } else {
        // Quiz to Result;
        quizPage.classList.add('d-none');
        resultFunc();
        resultPage.classList.remove('d-none');
        quizCount = 0;
    }
};
// Result to Home;
resultBtnLeft.onclick = () => {
    exitFunc('.resultPage');
    score = 0;
};
// Result to Quiz;
resultBtnRight.onclick = () => {
    resultPage.classList.add('d-none');
    quizPage.classList.remove('d-none');
    // Default Value;
    score = 0;
    // Start Timer;
    timerFunc(secondCount);
    // Start Time Bar;
    pBarFunc(secondCount);
    // Show Quiz;
    showQuizFunc();
};
