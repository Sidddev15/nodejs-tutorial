const delay = (ms) => new Promise(res => setTimeout(res,ms));

async function runQuiz() {
    console.log("Quiz Started");
    await delay(2000);
    console.log("Fetching Questions ...");
    await delay(3000);
    console.log("Quiz Ready!");
}

runQuiz();