// code sample for the case when
// 1. single thread and sync operations
// 2. multiple threads and async operations 

const { double, square, increment } = require('./sample-ops')

const input = process.argv[2]

const result1 = await double(input)
const result2 = await square(result1)
const output = await increment(result2)

// composition
// const output = increment(square(double(input)))

console.log(output)
