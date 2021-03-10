const assert = require('assert')
const logger = require('pino')({ level: 'silent' })
const devnull = () => {}

const Daterange = require('../Daterange.node')({}, { logger })

describe('Daterange', () => {
    
    let daterange = Object.create(Daterange)
    daterange.props = {
        in: 'daterange',
        out: 'date'
    }

    it('generate dates with step 1 day', () => {
        
        let test = ['2021-01-01', '2021-01-04']
        let check = ['2021-01-01', '2021-01-02', '2021-01-03', '2021-01-04']

        daterange.send = (port, message) => {

            if (port == 'done') return
            
            assert.deepStrictEqual(message.date, new Date(check.shift()))
            daterange._next(message, devnull)
        }
        daterange._in({ daterange: test }, devnull)
    })

    it('generate dates with step 3 days', () => {
        
        let test = ['2021-01-01', '2021-01-04', 3]
        let check = ['2021-01-01', '2021-01-04']

        daterange.send = (port, message) => {

            if (port == 'done') return

            assert.deepStrictEqual(message.date, new Date(check.shift()))
            daterange._next(message, devnull)
        }
        daterange._in({ daterange: test }, devnull)
    })
})