// code sample for the case
// 1. single thread and async operations (event loop)

const { doubleAsync, squareAsync, incrementAsync } = require('./sample-ops')
const input = process.argv[2]

// callback hell
doubleAsync(input, (err, result1) => {
  if (err) throw err
  squareAsync(result1, (err, result2) => {
    if (err) throw err
    incrementAsync(result2, (err, output) => {
      if (err) throw err
      console.log(output)
    })
  })
})
