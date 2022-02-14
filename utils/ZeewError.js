class ZeewError extends Error {
  constructor(error) {
    super()

    this.name = '[Zeew-Canvas ERROR]'
    this.message = error
  }
}

module.exports = ZeewError
