document.addEventListener("DOMContentLoaded", () => {
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
});


