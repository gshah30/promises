const { doublePromisified, squarePromisified, incrementPromisified, square, increment } = require('./sample-ops')

const input = process.argv[2]

// // promise chain
doublePromisified(input)
  .then(squarePromisified)
  .then(incrementPromisified)
  .then(console.log)
  .then(undefined, e => { throw e })

// promise chain sync (explain the sequence)
// doublePromisified(input)
//   .then(square)
//   .then(increment)
//   .then(console.log)
//   .catch(e => { throw e })
