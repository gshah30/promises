class MyPromise {
  #handlers = []
  #value = null
  #state = 'pending'

  #settleNext(promise, handler, success = true) {
    if (!success && !promise.#handlers.length)
      handler(this.#value)

    if (typeof handler == "function") {
      let result
      try {
        result = handler(this.#value)
      } catch (error) {
        promise.#reject(error)
      }

      if (typeof result?.then == 'function')
        result.then(this.#resolve.bind(promise), this.#reject.bind(promise))
      else
        promise.#resolve(result)
    } else {
      if (success)
        promise.#resolve(this.#value)
      else
        promise.#reject(this.#value)
    }
  }

  #resolve(value) {
    this.#value = value
    this.#state = 'resolved'
    this.#handlers.forEach(h => this.#settleNext(h.promise, h.successHandler, true))
  }

  #reject(err) {
    this.#value = err
    this.#state = 'rejected'
    this.#handlers.forEach(h => this.#settleNext(h.promise, h.errorHandler, false))
  }

  constructor(action) {
    if (action && typeof action === 'function')
      action(this.#resolve.bind(this), this.#reject.bind(this))
    else
      throw new Error('Promise resolver undefined is not a function')
  }

  then(successHandler, errorHandler) {
    const promise = new MyPromise(() => {})
    if (this.#state === 'pending')
      this.#handlers.push({ promise, successHandler, errorHandler })
    else if (this.#state === 'resolved')
      this.#settleNext(promise, successHandler, true)
    else if (this.#state === 'rejected')
      this.#settleNext(promise, errorHandler, false)

    return promise
  }

  catch(errorHandler) {
    return this.then(undefined, errorHandler)
  }
}

module.exports = MyPromise
