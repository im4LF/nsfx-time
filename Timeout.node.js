'use strict'

module.exports = {
    props: [ 'timeout' ],
    out_: 1,
    _in(message, done) {
        let timeout = typeof this.props.timeout === 'function' ? this.props.timeout(message) : this.props.timeout
        this.send('out', { t: Date.now() }, done)
        this.timer = setTimeout(_ => this.send('out', { t: Date.now() }), timeout)
    },
    _stop(message, done) {
        if (this.timer) clearTimeout(this.timer)
        done()
    }
}