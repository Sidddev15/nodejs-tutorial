# Goal Today:
- Understand how modules work in NodeJS
- Learn about require, module.exports, and how they interact
- Write your own custom modules from scratch
- Master common patterns used in large apps (factory, singleton, config-based, etc.).

## Why Use Modules?
Imagine writing a 1000-line API in one file. Painful, right?

Modules let you:
- Split logic into files (auth, db, utils, etc.)
- Reuse code across projects
- Isolate features for testing and debugging

### Concept: What Happens When You require() a File?
When you write:
``` 
const logger = require('./logger');
```
NodeJS does a lot under the hood:
- Loads the file (adds .js if needed).
- Wraps it in a special function 
```
(function(exports, require, module, __filename, __dirname) {
  // your logger.js code lives here
});
```
- Executes it once, and caches the result (for performance)
- Returns the `module.exports` object

### Let’s Build Your First Custom Module
Step 1: Create a File `logger.js`
```
function log(message) {
  console.log(`[LOG] ${new Date().toISOString()} - ${message}`);
}

module.exports = log;
```
Step 2: Use it in `app.js`
```
const log = require('./logger');

log('Siddharth just learned custom modules!');
```
Run it: node app.js

###  Example 2: Exporting an Object or Multiple Functions
`mathUtils.js`
```
function add(a, b) {
  return a + b;
}
function multiply(a, b) {
  return a * b;
}

module.exports = {
  add,
  multiply
};
```
`calculator.js`
```
const math = require('./mathUtils');

console.log("Add:", math.add(10, 20));
console.log("Multiply:", math.multiply(5, 4));
```
### Key Concepts to Remember
| Concept          | Description                                  |
|------------------|----------------------------------------------|
| `require()`      | Loads and executes the module once           |
| `module.exports` | What your file returns when required         |
| `exports`        | Alias for `module.exports` (don’t mix them!) |
| `__dirname`      | Current directory                            |
| `__filename`     | Current file path                            |

### Creative Example – Logger Factory
```
// loggerFactory.js
function createLogger(prefix) {
  return function(message) {
    console.log(`[${prefix}] ${message}`);
  };
}

module.exports = createLogger;
```
```
// app.js
const createLogger = require('./loggerFactory');
const authLogger = createLogger("AUTH");
const apiLogger = createLogger("API");

authLogger("User login started");
apiLogger("GET /home accessed");
```
### Quick Practice Time!
Try creating these:

- `auth.js`: export login, logout functions
- `dateUtil.js`: export current date formatter
- `userFactory.js`: returns new user object on each call

## Dev Thinking Prompt:
- If you import the same module multiple times in different files, does it run again? (No! It’s cached! 🚀)
- When would you use `require()` vs `import` (ESM)?

> (We’ll talk import/export when we touch on modern module systems next week!)


## Summary:
- Modules = reusable chunks of functionality
- You now know how to create and consume them
- `require()` pulls in logic, `module.exports` sends logic out.
- You’re thinking in components, not cluttered files.

