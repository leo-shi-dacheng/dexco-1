var dsBridge = require('dsbridge')
export default {
    callmethod (name, data, callback) {
        callback(dsBridge.call(name, data, callback))
    },
    registermethod (tag, callback) {
        dsBridge.register(tag, callback)
    },
    registerAsynmethod (tag, callback) {
        dsBridge.registerAsyn(tag, callback)
    }
}
