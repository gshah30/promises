const MyPromise = require('./promise.js')

const mockAsync = syncOperation => {
  return (x, callback) => {
    let result, error = null
    if (Math.random() < 0.02) error = new Error('Operation failed')
    if (!error) result = syncOperation(x)

    setTimeout(
      () => callback(error, result),
      Math.random() * 4000
    )
  }
}

const promisify = asyncOperation => x => new MyPromise((resolve, reject) => {
  asyncOperation(x, (err, result) =>  err ? reject(err) : resolve(result))
})

const double = x => 2 * x
const square = x => x * x
const increment = x => x + 1

const doubleAsync = mockAsync(double)
const squareAsync = mockAsync(square)
const incrementAsync = mockAsync(increment)

const doublePromisified = promisify(doubleAsync)
const squarePromisified = promisify(squareAsync)
const incrementPromisified = promisify(incrementAsync)

module.exports = { 
  double, square, increment,
  doubleAsync, squareAsync, incrementAsync,
  doublePromisified, squarePromisified, incrementPromisified
}
