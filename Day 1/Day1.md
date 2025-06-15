- NodeJS is a runtime enviornment that lets you run javascript on server.
- It uses Google's V8 Engine 
- It brings JS out of the browser, allowing backend and full stack in same language.
- Built on top of libuv - A C++ library that gives NodeJS event loops and async I/O capabilities.

### Why use NodeJS?
- Non-blocking i/o - Perfect for APIs, streaming, chat apps
- Single Language for full stack - JS on front and back 
- Massive EcoSystem - via npm
- Built-in features - HTTP, File System, Events

### NodeJS Architecture 

                    ┌────────────────────┐
                    │   JavaScript Code  │
                    └────────┬───────────┘
                             │
                             ▼
                     ┌────────────┐
                     │ V8 Engine  │  ➜  JS gets compiled here (C++)
                     └────┬───────┘
                          ▼
                 ┌────────────────┐
                 │   Node APIs    │ (fs, http, crypto etc.)
                 └─────┬──────────┘
                       ▼
               ┌────────────────────┐
               │     libuv          │
               │ Event Loop + Thread│
               │ Pool (C++ bindings)│
               └────────┬───────────┘
                        ▼
              ┌─────────────────────┐
              │    OS or Kernel     │
              └─────────────────────┘

### How to think like a nodeJS developer?
Most common mistakes ? Treating node like Python/Java
Node = Non-blocking async-first Mindset

So always ask !
- Is this operation blocking or non-blocking?
- Can this be handled asynchronously (using async/await, callback, Promises)?
- Will this scale when 1000+ users hit this at once?

You don't write
```const data = fs.readFileSync('file.txt') // ❌ blocks thread
```
You write: 
```
fs.readFile('file.txt', (err, data) => { // ✅ async
  console.log(data)
})
```
or even better ?
``` const data = await fs.promises.readFile('file.txt'); //async/await ```

# Practice Worksheet - NodeJS Basics
## Section 1: Quick Concept Check (Answer in your notes or comments)
1. What is nodeJS and how is it different from browser Javascript?
2. What is the V8 Engine responsible for? 
3. Why is NodeJS considered "non-blocking" even though it is single-threaded?
4. What is the role of libuv in NodeJS?
5. What are common use-cases where NodeJS shines?

## Section 2: Short Coding Tasks
- Create a file called `logger.js` that logs your name and current time every time it runs.

```
const name = "Siddharth";
const now = new Date().toLocaleString();
console.log(`Hello ${name}, you ran this on ${now}`);
```
Run using:
``` node logger.js ```

### Synchronous vs Asynchronous File Read
Create readFileSync.js and readFileAsync.js [Create test.txt with any content and observe the order of output.]
```
// readFileSync.js
const fs = require('fs');
const data = fs.readFileSync('test.txt', 'utf-8');
console.log(data);
console.log('After sync read');
```
#### 🧠 What’s Really Happening in Node’s Brain (Behind the Scenes)
In `readFileSync.js`
- Node hits fs.readFileSync(...)
- It says: “Wait right here until the file is read from disk”
- Node blocks the entire event loop while reading the file 😐
- Once reading finishes, it moves to console.log(data)
- Then console.log('After sync read') finally executes

#### Output Order
```
<file content>
After sync read
```
---
```
const fs = require('fs');
fs.readFile('test.txt', 'utf-8', (err, data) => {
  if (err) throw err;
  console.log(data);               // ← This gets scheduled to run *later*
});
console.log('After async read');   // ← This runs immediately!

```
#### 🧠 What’s Really Happening in Node’s Brain (Behind the Scenes)
In `readFileAsync.js`
- Node hits fs.readFile(...)
- Node says: “Okay, I’ll start reading it. Meanwhile, I’ll continue with the next line.”
- `console.log('After async read')` runs immediately (without waiting for file read)
- Once the file is ready (after a few milliseconds), Node jumps back into the callback and logs the file content.

#### Output Order
```
After async read
<file content>
```
#### How NodeJS Handles This (Event Loop in Action)
1. Main thread / Call Stack runs from Top to Bottom.
2. When it hits the async operation (fs.readFile, setTimeout etc) it: 
  - Registers the operation with the OS via libuv
  - Offloads the task
  - Moves on without waiting
3. When the OS says "I'm Done" NodeJS queues all the callback.
4. When the call stack is empty again, Node picks the callback and excecutes it.

So, in async:
- console.log("After async read") is a simple statement → it runs right away
- console.log(data) is inside a callback → queued for later.

### Core Difference 

| Feature            | readFileSync           | readFile                |
|--------------------|------------------------|-------------------------|
| **Type**           | Blocking               | Non-blocking            |
| **Execution**      | Waits for file read to finish | Continues, reads in background |
| **Ideal Use Case** | CLI tools, startup scripts | Web servers, APIs       |
| **Scalability**    | ❌ Blocks thread       | ✅ Scales well           |
---
### Delay Simulator
Create a file called delay.js that simulates delay using `setTimeout`.
```
console.log("Start");

setTimeout(() => {
  console.log("This is delayed by 2 seconds");
}, 2000);

console.log("End");

```