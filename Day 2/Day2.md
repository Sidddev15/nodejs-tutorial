# Goal Today:
Understand how NodeJS handles asynchronous operations behind the scenes using:

- ✅ Call Stack
- ✅ Event Loop
- ✅ Callback Queue
- ✅ Microtask Queue (Promises, async/await)
- ✅ Real-world hands-on to feel the async behavior

### 🧠 What is the Event Loop?
The Event Loop is NodeJS's brain — it coordinates when code executes, especially when dealing with asynchronous tasks.

### NodeJS Execution Flow (Think Like This):
1. Run code from top to bottom -> Call Stack
2. Encounter Async Task -> Push the web APIs(setTimeout, fs etc)
3. When async is done => push callback to callback queue
4. Event Loop : If call stack is empty -> Pull from the queue and execute.

### Visualize This Like a Developer:

                    ┌────────────────────────────┐
                    │     Your JS Code           │
                    └────────────┬───────────────┘
                                ▼
                            ┌────────┐
                            │ Stack  │ ← runs line by line (sync)
                            └──┬─────┘
                            ▼
                        ┌──────────┐
                        │ Web APIs │ ← handles async ops (fs, setTimeout, etc.)
                        └──┬───────┘
                            ▼
                    ┌──────────────┐
                    │ Callback Queue│ ← callbacks for setTimeout, fs, etc.
                    └─────┬────────┘
                            ▼
                    ┌────────────────────┐
                    │     EVENT LOOP      │ ← the boss: "Is stack empty? Yes? Run next"
                    └────────────────────┘

### What's this Web API box doing in the flow?
It’s the hidden hero — the place where async tasks are offloaded and processed.
Even though it's shown in diagrams (like Loupe or slides), it's not part of your JS code — it's part of the environment in which JavaScript runs.

- But what exactly is this WebAPI box doing in the flow?
It's a hidden hero - the place where async tasksare offloaded and processed.
Even though it's shown in diagrams (Like loupe or slides), it's not a part of JS code - it's part of the enviornment in which javascript runs.

Think of WebAPI as a background utility service (powdered by the browser of nodejs itself).
That handles tasks outside of the JS engine, like:
- Timers (setTimeout, setInterval)
- File system reads (fs.readFile)
- HTTP requests
- Cryptography
- TCP sockets
- DNS resolution

### In NodeJS Specifically: 
In browsers, Web APIs = part of the browser (e.g., Chrome handles setTimeout for JS)
But in NodeJS, it's not called "Web API" (that’s just a name). It’s:
- libuv: A C++-based library that:
    - Handles async operations
    - Maintains thread pool
    - Talks to your OS to get file, network, and timer data

### What About Microtask Queue?
- Promises/async/await use the Microtask queue.
- They are given higher priority than `setTimeout`, `fs.readFile` etc


## Hands-On Code Example: Test Your Brain
Create a file eventLoopDemo.js
```
console.log("1. Start");

setTimeout(() => {
  console.log("4. setTimeout callback");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Promise resolved");
});

console.log("2. End");
```
### OUTPUT
1. Start
2. End
3. Promise resolved
4. setTimeout callback

Why?

- 1 & 2 run immediately (Call Stack)
- Promise goes to Microtask Queue → runs after stack clears
- setTimeout(..., 0) goes to Callback Queue → runs after microtasks

Priority : SyncOperations -> (asyncDetected) -> Promised Resolved -> setTimeout callback -> AsyncOperationsDone(file read and other async operations)