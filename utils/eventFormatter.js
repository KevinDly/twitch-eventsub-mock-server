module.exports = {
    createCommand: function(type, event, options = {}) {
        let baseCommand = `twitch event ${type} ${event}`
        Object.keys(options).forEach(option => {
            baseCommand = baseCommand + ` ${option} ${options[option]}`
        })
        return baseCommand
    }
}