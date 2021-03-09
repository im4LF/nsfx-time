
# Time nodes

- `Ticks` - emit new message with `t` key as `Date.now()` by every `interval` prop
- `Timeout` - timeout by `timeout` prop
- `Daterange` - generate array of dates between start and stop by step from `daterange` key from message and push to `out` port one by one as `date` key

## Usage

### Ticks

```js
const def = `
# get new token every day
ticks(@xfx/time/Ticks, {"interval": 86400000}) -> GET token(Tokens)
`

build(def, {}, { logger, nodesdir: __dirname }, (err, flow) => {

    flow.ticks.start.write({})
})
```

### Timeout

```js
const def = `
timeout(@xfx/time/Timeout, {"timeout": 1000}) -> execute(./Dummy)
`

build(def, {}, { logger, nodesdir: __dirname }, (err, flow) => {

    flow.timeout.in.write({})
})
```

### Daterange

```js
const def = `
# generate array of dates between start, stop by step from daterange key from message
dates(@xfx/time/Daterange) -> GET_BY_DATE request(./Dummy) -> NEXT dates

request EMPTY -> NEXT dates
`

build(def, {}, { logger, nodesdir: __dirname }, (err, flow) => {

    flow.dates.in.write({ daterange: ['2021-01-01', '2021-01-10', 2] })
})
```