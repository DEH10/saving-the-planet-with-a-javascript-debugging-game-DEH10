let prompt;
try {
    prompt = require("prompt-sync")(); // Try to load prompt-sync
} catch (e) {
    // If prompt-sync is not available, define a fallback prompt function using readline
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    prompt = async function (question) {
        return new Promise((resolve) => {
            rl.question(question, (answer) => {
                resolve(answer);
            });
        });
    };
}

console.log('Welcome to the Climate Change Awareness Game!');

let score = 0;

async function decisionScenario(question, options, correctAnswerIndex) {
	//Bug fix to Removed the unused variable 'j'
    console.log(question);

    for (let i = 0; i < options.length; i++) {
        console.log(`${i + 1}. ${options[i]}`);
    }

    let playerAnswer;
    do {
        playerAnswer = parseInt(await prompt("Enter your choice (number):")) - 1;
    } while (isNaN(playerAnswer) || playerAnswer < 0 || playerAnswer >= options.length);

    if (Array.isArray(correctAnswerIndex)) {
        if (correctAnswerIndex.includes(playerAnswer)) {
            console.log('Correct! You made an environment-friendly decision. +1 point.');
            score++;
        } else {
            console.log(`Incorrect! The correct choice(s) were: ${correctAnswerIndex.map(i => options[i]).join(', ')}`);
        }
    } else {
        if (playerAnswer === correctAnswerIndex) {
            console.log('Correct! You made an environment-friendly decision. +1 point.');
            score++;
        } else {
            console.log(`Incorrect! The correct choice was: ${options[correctAnswerIndex]}`);
        }
    }
}

(async () => {
    await decisionScenario(
        'You are going to the supermarket. How do you choose to carry your groceries?',
        ['Plastic bags provided by the store', 'Bring your own reusable bags', 'Carry them without any bag'],
        1
    );

    await decisionScenario(
        '\nYou are buying a new car. Which type do you choose?',
        ['A gasoline-powered car', 'A hybrid car', 'An electric car'],
        2
    );

    await decisionScenario(
        '\nYou want to dispose of old electronics. What do you do?',
        ['Throw them in the regular trash', 'Sell or donate them', 'Take them to an e-waste recycling center'],
        2
    );

    await decisionScenario(
        '\nYou want to dispose of old electronics. What do you do?',
        ['Throw them in the regular trash', 'Sell or donate them', 'Take them to an e-waste recycling center', 'Refurbish and continue using them'],
        [3]
    );

    await decisionScenario(
        '\nHow do you prefer to eat your meals?',
        ['Takeout from restaurants in disposable containers', 'Cooked at home with locally sourced ingredients', 'Processed and packaged meals', 'Home cooked meals with ingredients from your own garden'],
        1
    );

    console.log(`\nGame Over! Your total score is: ${score}. Thank you for playing.\n`);
})();


//Bug fixes & Upgrades:

//Fixed loop condition in decisionScenario function to correctly iterate over all options.
//I removed unused variable j.
//I then added input validation to ensure the player enters a valid choice.
//I corrected the scoring logic to increase the score when the player answers correctly.
//I then updated the feedback message to display the correct choice when the player answers incorrectly.
//Next, I removed the incorrect usage of function parameters to fix the scenario with multiple correct answers.
//After, I improved the code by removing unnecessary parameters from function calls.

//Upgrades:

// Also, there was an error trying to access a file (/dev/tty) that doesn't exist.
// This error occured while using the prompt-sync library in my Node.js environment that doesn't support synchronous I/O operations in my web browser enviornment.
// To resolve this issue, I switched to an asynchronous approach for user input handling using the built-in readline module in Node.js
// This asynchronous approach helped ensure compatibility across different environments and to avoid the error I was encountering.
// This upgrade was made by creating a wrapper function that uses prompt-sync for synchronous input handling and falls back to readline for asynchronous input handling if prompt-sync is not available. 