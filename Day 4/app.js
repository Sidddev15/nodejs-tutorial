// const log = require('./logger');
// log('I just learned creating custom modules');

const createLogger = require('./loggerFactory');
const auth = require('./auth');

// Logger
const authLogger = createLogger("AUTH");
const apiLogger = createLogger("API");

authLogger("User Login Started");
apiLogger("GET /home accessed");

// Authentication
const result = auth.login('admin', '123455');
console.log(result.message);

//Simulate logout
const bye = auth.logout('admin');
console.log(bye);