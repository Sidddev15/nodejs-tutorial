function createLogger(prefix) {
    return function(message) {
        console.log(`[${prefix}] ${message}`)
    }
}

module.exports = createLogger;