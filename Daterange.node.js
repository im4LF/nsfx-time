'use strict'

module.exports = (args, env) => ({
    props: {
        in: { default: 'daterange' },
        out: { default: 'date' }
    },
    _in(message, done) {

        this.__items = []
        let current = new Date(message[this.props.in][0])
        let stop = new Date(message[this.props.in][1])
        let step = message[this.props.in][2] || 1

        env.logger.debug({ current, stop }, this.name)
        
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