class UnauthorizedAccessError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedAccessError";
  }
}   

module.exports = UnauthorizedAccessError