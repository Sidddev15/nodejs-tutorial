// auth.js

// Simulated session store
const sessions = new Map(); // { username: true }

function login(username, password) {
  const user = { username: 'admin', password: '1234' };

  if (username === user.username && password === user.password) {
    sessions.set(username, true); // Mark as logged in
    return {
      success: true,
      message: `Welcome back, ${username}!`
    };
  } else {
    return {
      success: false,
      message: "Invalid credentials"
    };
  }
}

function logout(username) {
  if (sessions.get(username)) {
    sessions.delete(username); // Remove session
    return `User ${username} has been logged out successfully.`;
  } else {
    return `User ${username} is not logged in.`;
  }
}

module.exports = {
  login,
  logout
};
