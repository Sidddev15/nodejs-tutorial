const fs = require('fs');
// fs.readFile('hello.txt', 'utf-8', (err, data) => {
//     if (err) throw err;
//     console.log("Content:", data);
// })

// fs.writeFile('output.txt', 'Hello from siddharth', (err) => {
//     if (err) throw err;
//     console.log("file written")
// })

fs.appendFile('output.txt', '\nThis was appended later', () => {});
console.log('file appended')