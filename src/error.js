class PayError extends Error {
  constructor (message, raw) {
    super(message)
    this.message = message
    this.name = this.constructor.name
    this.raw = raw
  }
}

exports.GatewayException = class GatewayException extends PayError {}
exports.InvalidSignException = class InvalidSignException extends PayError {}
