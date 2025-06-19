console.log("1. Start");

setTimeout(() => {
    console.log("4. setTimeout Callback");
}, 0)

Promise.resolve().then(() => {
    console.log("3. Promise Resolved")
});

console.log("2. End");

const fs = require('fs'); 
fs.readFile('test.txt', 'utf-8', () => {
    console.log("5. File read complete.")
})