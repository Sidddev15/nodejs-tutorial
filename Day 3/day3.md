## Goal Today
- Learn how to use the most common core NodeJS modules
- Understand how to build low-level tools without Express
- Hands-on experience with `fs`, `http`, `path`, `os`, `url`

### Core Modules Breakdown (Built into NodeJS — No npm needed)
| Module | Purpose                                  |
|--------|------------------------------------------|
| fs     | File System operations (read/write/delete files) |
| path   | Handles file paths and extensions        |
| http   | Create raw HTTP servers                  |
| os     | System info like CPU, memory             |
| url    | Parse and build URLs                     |

#### `fs`(File System Module)
Read a file
```
const fs = require('fs');
fs.readFile('hello.txt', 'utf-8', (err, data) => {
  if (err) throw err;
  console.log("Content:", data);
});

```
# Node.js Basics - File Handling, HTTP Servers, and System Info

## ✅ Write to a file:
```js
fs.writeFile('output.txt', 'Hello from Siddharth!', (err) => {
  if (err) throw err;
  console.log('File written!');
});

### Append to a file:

``` 
fs.appendFile('output.txt', '\nThis was appended later.', () => {});
```
### 2. http (Create a Raw Web Server)
```
const http = require('http');

const server = http.createServer((req, res) => {
  console.log("URL hit:", req.url);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end("Hello Siddharth, your server is live!");
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```
Go to browser: http://localhost:3000 → BOOM 💣

### 3. path (File path handling)
```
const path = require('path');

const filePath = '/home/sid/code/server.js';

console.log(path.basename(filePath)); // server.js
console.log(path.dirname(filePath));  // /home/sid/code
console.log(path.extname(filePath));  // .js
```
### 4. os (System Information)

```
const os = require('os');

console.log("OS:", os.platform());
console.log("CPU Cores:", os.cpus().length);
console.log("Free Memory:", os.freemem());
console.log("Total Memory:", os.totalmem());
```
### 5. url (Parse and Build URLs)

```
const url = require('url');

const parsedUrl = new URL('https://bytebysidd.com/about?name=Siddharth&age=28');

console.log(parsedUrl.pathname); // /about
console.log(parsedUrl.searchParams.get('name')); // Siddharth
```

## 🧪 Mini Hands-On Project: Static File Server
You’ll combine fs, http, path, url to build a simple file server:

### 📁 Project structure:

static-server/
├── index.js
└── public/
    └── hello.html
```
```
index.js

const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, 'public', req.url === '/' ? 'hello.html' : req.url);
  
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('File not found');
    } else {
      res.writeHead(200);
      res.end(content);
    }
  });
});
server.listen(3000, () => console.log('Static server running at http://localhost:3000'));
