# GOAL TODAY: 
- Understand how npm works (including package.json, semantic versioning)
- Use real-life third-party modules (chalk, axios, uuid, etc.)
- Create a CLI tool (your first developer utility!)
- Learn global install vs local

What is `npm`?
> npm = Node Package Manager — it's a registry of 2M+ open-source libraries for NodeJS and frontend JS.

npm allows you to:

- Install packages (local or global)
- Manage versions of dependencies
- Publish your own packages

### Step 1: Init a Project (Create package.json)
```
mkdir my-cli-tool && cd my-cli-tool
npm init -y
```
You now have a package.json that looks like:
```
{
  "name": "my-cli-tool",
  "version": "1.0.0",
  "main": "index.js"
}
```
### Step 2: Install Some Useful 3rd-Party Modules
```
npm install chalk axios uuid
```

- `chalk`: adds colors to terminal logs
- `axios`: makes HTTP requests
- `uuid`: creates unique IDs

## 🧪 Example: Build a Mini Weather CLI
### 1. Create weather.js
```
const axios = require('axios');
const chalk = require('chalk');

// Replace with your actual API key if needed
const API_KEY = 'YOUR_API_KEY';
const CITY = process.argv[2] || 'Delhi';

async function getWeather(city) {
  try {
    const res = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
    );

    const data = res.data;
    console.log(chalk.blue(`🌤  Weather in ${city}:`));
    console.log(chalk.green(`Temp: ${data.current.temp_c}°C`));
    console.log(chalk.yellow(`Condition: ${data.current.condition.text}`));
  } catch (err) {
    console.log(chalk.red('Could not fetch weather:'), err.message);
  }
}

getWeather(CITY);
```
### 2. Run it:
```
node weather.js Mumbai
```
### Output
```
🌤  Weather in Mumbai:
Temp: 32°C
Condition: Sunny
```
## Global vs Local Installs

| Install Type | Command                    | Use Case                    |
|--------------|----------------------------|-----------------------------|
| Local        | `npm install chalk`         | For one project only        |
| Global       | `npm install -g nodemon`    | CLI tools usable everywhere |

```
npm install -g nodemon
nodemon app.js
```

## Create a Reusable CLI Tool
### 1. Create bin/index.js
```
#!/usr/bin/env node

const chalk = require('chalk');
const name = process.argv[2] || 'Developer';

console.log(chalk.green(`Hey ${name}, you're crushing NodeJS! 🚀`));
```
### 2. Update package.json
```
"bin": {
  "sayhi": "./bin/index.js"
}
```
### 3. Link it globally:
```
npm link
```
Now anywhere in your terminal:
```
sayhi Siddharth
```
It prints:
>Hey Siddharth, you're crushing NodeJS! 🚀

## Understanding Semantic Versioning (semver)
```
"chalk": "^5.3.0"
```

| Symbol   | Meaning                               |
|----------|---------------------------------------|
| `^5.3.0` | Accept minor/patch updates (5.x.x)    |
| `~5.3.0` | Only patch updates (5.3.x)            |
| `5.3.0`  | Locked to exact version              |

## Summary
You now know:

- How to use npm like a backend engineer
- Installed and used 3rd-party packages like chalk, axios, uuid
- Built your own CLI tool
- Understood package.json and semantic versioning

> chalk@5.x is a pure ESM module now - meaning
❌ It no longer supports `require()`
✅ You must use `import` instead

### Convert Your File to ES Module (Recommended if you're using ESM)
```
mv weather.js weather.mjs
```
### Use `import` statements:
```
import axios from 'axios';
import chalk from 'chalk';
```

###  Run it using:
```
node weather.mjs
```

# WHAT I HAVE LEARNED 
## 📅 NodeJS - Day 5: npm, CLI Tools & Third-Party Modules

### ✅ What I Learned

- 🛠 **Understanding `npm` (Node Package Manager)**  
  - How to initialize a NodeJS project using `npm init`
  - Managing dependencies with `npm install`
  - Semantic versioning (`^1.0.0`, `~1.0.0`, etc.)

- 📦 **Installing & Using Third-Party Modules**
  - `chalk`: For styling terminal output
  - `axios`: To make HTTP requests (e.g., fetch weather)
  - `uuid`: To generate unique identifiers

- 💡 **Difference Between Local and Global npm Install**
  - Local: `npm install <pkg>` (for project)
  - Global: `npm install -g <pkg>` (available everywhere)

- ⚙️ **Creating a Custom CLI Tool**
  - Wrote a script that prints a greeting using `chalk`
  - Created a command-line interface using:
    - `#!/usr/bin/env node` (shebang)
    - `process.argv` to read input
  - Linked my CLI tool globally using `npm link`

- 📂 **Updated `package.json` with a CLI bin entry**
```json
"bin": {
  "sayhi": "./bin/sayhi.mjs"
}

---

### 📌 Understanding `process.argv[2]` in NodeJS

When building CLI tools in NodeJS, we often use `process.argv` to access command-line arguments.

#### 🔍 What is `process.argv`?

- `process.argv` is an **array** that holds all the arguments passed to a NodeJS script when run via the terminal.

#### 🧪 Example

If you run this in your terminal:

```bash
node greet.js Siddharth

console.log(process.argv);
```
```
You'll get output like:
```

```
[
  '/usr/bin/node',            // process.argv[0]: path to Node
  '/path/to/greet.js',        // process.argv[1]: path to your script
  'Siddharth'                 // process.argv[2]: the actual argument
]

What does [2] mean?
- process.argv[2] refers to the third item in the array, which is the first user-supplied argument.
- This is usually the value passed by the user (e.g., a name, city, or command flag).