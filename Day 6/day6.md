# 📦 NodeJS Day 6 – Environment Variables & Configuration Management

Welcome to **Day 6** of mastering NodeJS! Today, we focus on making your applications **secure, scalable, and production-ready** by using environment variables, `.env` files, and configuration patterns.

## 🎯 Goals for Today
- Learn how to use `.env` files and the `dotenv` package
- Manage sensitive data and application configuration
- Prepare your app for different environments like development, staging, and production

## 🔐 What Are Environment Variables?
Environment variables are **external values injected into your app’s runtime**, commonly used to manage:
- Database connection URLs
- API keys
- Secret tokens
- Port numbers
- App-level feature flags (e.g., `DEBUG=true`)

### ❌ Bad Practice (Hardcoding Secrets)
```js
const API_KEY = 'a9b8c7supersecret123'; // Dangerous!
```
## Step-by-Step Setup
### 1. Install dotenv
> npm install dotenv
### 2. Create a `.env` File in Your Project Root
```
PORT=5000
API_KEY=super_secret_123
DB_URL=mongodb://localhost:27017/mydb
DEBUG=true
```
### 3. Load Variables Using dotenv in Your Code
```
require('dotenv').config(); // Always at the top

const port = process.env.PORT;
const debug = process.env.DEBUG === 'true';

console.log(`App running on port ${port}`);
if (debug) {
  console.log("Debug mode is ON");
}
```
> Important: Never Commit `.env` Files!
Always add `.env` to your .gitignore file to avoid leaking secrets:
```
# .gitignore
.env
.env.*
```
## Why This Is Crucial

| Feature              | Benefit                                     |
|----------------------|---------------------------------------------|
| Keeps code clean     | No hardcoded values                        |
| Environment support  | Easily switch between dev, staging, prod   |
| Safer deployments    | Secrets live in CI/CD, not in source code  |

## Real-World Config Structure
In real apps, you may split configurations by environment.

### Folder Structure:
```
/config
  ├── default.js
  ├── development.js
  ├── production.js
```

Example: config/default.js
```
module.exports = {
  PORT: process.env.PORT || 3000,
  DB_URL: process.env.DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  ENABLE_SIGNUP: process.env.ENABLE_SIGNUP === 'true'
};
```

In your main `app.js`
```
const config = require('./config/default');

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
```
## Example Project: Feature Toggle Using `.env`
`.env`
```
PORT=4000
ENABLE_REGISTRATION=false
```

`app.js`
```
require('dotenv').config();
const express = require('express');
const app = express();

if (process.env.ENABLE_REGISTRATION === 'true') {
  app.post('/register', (req, res) => {
    res.send('User registered successfully.');
  });
} else {
  console.log('⚠️ Registration is disabled via config.');
}

app.listen(process.env.PORT, () => {
  console.log(`App is live on port ${process.env.PORT}`);
});
```
## Bonus Tooling Suggestions

| Tool            | Purpose                                        |
|-----------------|------------------------------------------------|
| `cross-env`     | Platform-safe way to set env vars in scripts  |
| `env-cmd`       | Load specific env files for environments      |
| `dotenv-expand` | Supports nested variables like ${BASE_URL}/v1  |


## What Should You Always Keep in `.env`?
- API keys and tokens
- Database URLs
- Secret salts, JWT secrets
- Payment gateway credentials
- Admin email lists
- Feature flags

## Developer Thinking Prompts
- What config values must change between development and production?
- How would you keep `.env` safe in CI/CD pipelines?
- How do you expose environment config to frontend (carefully)?

##  Summary
- `.env` files and dotenv give you clean, secure config
- Always use process`.env`.VARIABLE instead of hardcoded values
- Never commit `.env` to GitHub
- You’re now able to run the same app across multiple environments
- You’ve stepped into real backend engineering