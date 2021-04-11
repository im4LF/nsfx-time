'use strict'

module.exports = (args, env) => ({
    props: {
        out: { default: 'date' },
        start: { default: Date.now() },
        stop: { default: Date.now() },
        step: { default: 1 }
    },
    _in(message, done) {

        let start = typeof this.props.start === 'function' ? this.props.start(message) : this.props.start
        let stop = typeof this.props.stop === 'function' ? this.props.stop(message) : this.props.stop
        let step = typeof this.props.step === 'function' ? this.props.step(message) : this.props.step

        let current = new Date(start)
        env.logger.debug({ current, stop }, this.name)
        
        this.__items = []
        while (current <= stop) {
            this.__items.push(new Date(current))
            current = new Date(current.setDate(current.getDate() + step))
        }

        env.logger.debug({ current, stop, res: this.__items }, this.name)

        this._next(message, done)
    },
    _next(message, done) {
        let buf = this.__items.splice(0, 1)
        if (buf.length) {
            this.send('out', { ...message, [ this.props.out ]: buf[0] })
        }
        else {
            this.send('done', message)
        }
        done()
    },
    out_: 1,
    done_: 1
})