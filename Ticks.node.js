'use strict'

module.exports = {
    props: [ 'interval' ],
    out_: 1,
    _start(message, done) {
        let interval = typeof this.props.interval === 'function' ? this.props.interval(message) : this.props.interval
        this.send('out', { t: Date.now() }, done)
        this.timer = setInterval(_ => this.send('out', { t: Date.now() }), interval)
    },
    _stop(message, done) {
        if (this.timer) clearInterval(this.timer)
        done()
    }
}