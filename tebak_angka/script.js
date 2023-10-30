const localTotalVictoryField = document.getElementById("local-total-victory-field");
const localMaximumAttemptField = document.getElementById("local-maximum-attempt-field");
const destroyDataButton = document.getElementById("destroy-data-button");
const playButton = document.getElementById("play-button");
const beforeGameDisplay = document.getElementById("before-game-display");
const duringGameDisplay = document.getElementById("during-game-display");
const afterGameDisplay = document.getElementById("after-game-display");
const answerButton1 = document.getElementById("answer-1-button");
const answerButton2 = document.getElementById("answer-2-button");
const answerButton3 = document.getElementById("answer-3-button");
const sessionUserAnswerField = document.getElementById("session-user-answer-field");
const sessionUserWrongAnswerField = document.getElementById("session-user-wrong-answer-field");
const sessionTrueAnswerField = document.getElementById("session-true-answer-field");
const sessionUserAttemptsAmountField = document.getElementById("session-user-attempts-amount-field");

// membuat jawaban
function getAnswer() {
    let answer = '123'.split('');
    for (let i = 0; i < answer.length; i++) {
        let j = Math.floor(Math.random() * i + 1);
        let tmp = answer[i];
        answer[i] = answer[j];
        answer[j] = tmp;
    }
    return answer.join('');
}

// session storage key
const sessionAnswerKey = 'SESSION_ANSWER';
const sessionUserAttemptsKey = 'SESSION_USER_ATTEMPTS';
const sessionUserIsPlayingKey = 'SESSION_USER_IS_PLAYING';

// local storage key
const localTotalVictoryKey = 'LOCAL_TOTAL_VICOTRIES_PLAYED';
const localMaximumAttemptsKey = 'LOCAL_MAXIMUM_ATTEMPTS';

window.addEventListener('load', () => {
    if (typeof (Storage) !== 'undefined') {
        if (sessionStorage.getItem(sessionAnswerKey) === null) {
            sessionStorage.setItem(sessionAnswerKey, '');
        }
        if (sessionStorage.getItem(sessionUserAttemptsKey) === null) {
            sessionStorage.setItem(sessionUserAttemptsKey, 0);
        }
        if (sessionStorage.getItem(sessionUserIsPlayingKey) === null) {
            sessionStorage.setItem(sessionUserIsPlayingKey, false);
        }
        if (localStorage.getItem(localTotalVictoryKey) === null) {
            localStorage.setItem(localTotalVictoryKey, 0);
        }
        if (localStorage.getItem(localMaximumAttemptsKey) === null) {
            localStorage.setItem(localMaximumAttemptsKey, 0);
        }
    } else {
        alert('Browser yang anda gunakan tidak mendukung web storage');
    }

    sessionUserAttemptsAmountField.innerText = sessionStorage.getItem(sessionUserAttemptsKey);
    localTotalVictoryField.innerText = localStorage.getItem(localTotalVictoryKey);
    localMaximumAttemptField.innerText = localStorage.getItem(localMaximumAttemptsKey);
});

playButton.addEventListener('click', () => {
    sessionStorage.setItem(sessionAnswerKey, getAnswer());
    sessionStorage.setItem(sessionUserIsPlayingKey, true);
    duringGameDisplay.removeAttribute('hidden');
    beforeGameDisplay.setAttribute('hidden', false);
});

answerButton1.addEventListener('click', () => {
    sessionUserAnswerField.innerText += '1';
    if (sessionUserAnswerField.innerText.length == 3) {
        checkAnswer(sessionUserAnswerField.innerText);
    }
});

answerButton2.addEventListener('click', () => {
    sessionUserAnswerField.innerText += '2';
    if (sessionUserAnswerField.innerText.length == 3) {
        checkAnswer(sessionUserAnswerField.innerText);
    }
});

answerButton3.addEventListener('click', () => {
    sessionUserAnswerField.innerText += '3';
    if (sessionUserAnswerField.innerText.length == 3) {
        checkAnswer(sessionUserAnswerField.innerText);
    }
});

function checkAnswer(userAnswer) {
    console.log(sessionStorage.getItem(sessionAnswerKey));
    console.log('mengecek jawaban');
    if (sessionStorage.getItem(sessionAnswerKey) == userAnswer) {
        console.log('jawaban benar');
        afterGameDisplay.removeAttribute('hidden');
        duringGameDisplay.setAttribute('hidden', true);
        sessionTrueAnswerField.innerText = userAnswer;
        updateScore();
    } else {
        sessionUserWrongAnswerField.innerText = userAnswer;
        const previousAttempt = parseInt(sessionStorage.getItem(sessionUserAttemptsKey));
        sessionStorage.setItem(sessionUserAttemptsKey, previousAttempt + 1);
        sessionUserAttemptsAmountField.innerText = sessionStorage.getItem(sessionUserAttemptsKey);
        sessionUserAnswerField.innerText = '';
    }
}

function updateScore() {
    const sessionAttemptValue = parseInt(sessionStorage.getItem(sessionUserAttemptsKey));
    const localAttemptValue = parseInt(localStorage.getItem(localMaximumAttemptsKey));

    if (sessionAttemptValue > localAttemptValue) {
        localStorage.setItem(localMaximumAttemptsKey, sessionAttemptValue);
        localMaximumAttemptField.innerText = localStorage.getItem(localMaximumAttemptsKey);
    }

    const previousTotalVictoryAmount = parseInt(localStorage.getItem(localTotalVictoryKey));
    localStorage.setItem(localTotalVictoryKey, previousTotalVictoryAmount + 1);
    localTotalVictoryField.innerText = localStorage.getItem(localTotalVictoryKey);
}

window.addEventListener('beforeunload', function () {
    sessionUserAnswerField.innerText = '';
    sessionUserWrongAnswerField.innerText = '';
    sessionStorage.setItem(sessionUserAttemptsKey, 0);
    sessionUserAttemptsAmountField.innerText = sessionStorage.getItem(sessionUserAttemptsKey);
});

destroyDataButton.addEventListener('click', function () {
    sessionStorage.removeItem(sessionAnswerKey);
    sessionStorage.removeItem(sessionUserAttemptsKey);
    sessionStorage.removeItem(sessionUserIsPlayingKey);
    localStorage.removeItem(localTotalVictoryKey);
    localStorage.removeItem(localMaximumAttemptsKey);
    alert('Mohon me-refresh halaman ini kembali');
});