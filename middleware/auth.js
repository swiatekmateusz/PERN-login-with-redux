const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = auth = (req, res, next) => {
  const token = req.header('x-auth-token')

  if (!token) {
    return res.status(401).json({ msg: "No token, unautorized" })
  }
  const jwtVerify = jwt.verify(token, config.get('jwtSecrets.jwtSecret'), (err, decoded) => {
    if (err) res.status(401).send('Token is not valid')
    if (decoded) req.user = decoded.user
    next()
  })

}