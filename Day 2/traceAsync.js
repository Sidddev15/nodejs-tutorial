const asyncHooks = require('async_hooks');
const fs = require('fs');

const hook = asyncHooks.createHook({
    init(asyncId, type, triggerAsyncId) {
        fs.writeSync(1, `Init: ${type} (${asyncId}) triggered by ${triggerAsyncId}\n`);
    },
    before(asyncId) {
        fs.writeSync(1, `Before ${asyncId}\n`);
    },
    after(asyncId) {
        fs.writeSync(1, `After: ${asyncId}\n`);
    },
    destroy(asyncId) {
        fs.writeSync(1, `Destroy: ${asyncId}\n`);
    }
});

hook.enable();

setTimeout(() => {
    console.log('Timer done');
}, 1000)