const os = require('os');

console.log("OS:", os.platform());
console.log("CPU cores:", os.cpus().length);
console.log("Free memory", os.freemem());
console.log("Total Memory", os.totalmem());
console.log("hostname", os.hostname());
console.log("networkInterfaces", os.networkInterfaces());
console.log("uptime", os.uptime());
console.log("tmpdir", os.tmpdir());
console.log("userInfo", os.userInfo());