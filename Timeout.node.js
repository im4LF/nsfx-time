'use strict'

module.exports = (args, env) => ({
    props: [ 'timeout' ],
    out_: 1,
    _in(message, done) {
        let timeout = typeof this.props.timeout === 'function' ? this.props.timeout(message) : this.props.timeout
        this.timer = setTimeout(() => {
            this.send('out', { t: Date.now() }, done)
        }, timeout)
    },
    _stop(message, done) {
        if (this.timer) clearTimeout(this.timer)
        done()
    }
})