const accessDenied = (response) => {
  response.status(403).send('Access denied!')
}

module.exports = {
  accessDenied
}   