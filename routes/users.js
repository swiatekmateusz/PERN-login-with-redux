const runQuery = require('../config/queries')
const { check, validationResult } = require('express-validator')
const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const transporter = require('../config/mail')

// @route POST  api/users
// @desc  Register a user
// @access Public
router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with minimum 6 characters').isLength({ min: 6 })
], async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, email, password } = req.body

  // Check if email is used
  const queryIsEmailUsed = "SELECT * FROM users WHERE email = $1"
  const runIsEmailUsed = await runQuery(queryIsEmailUsed, [email])
  if (runIsEmailUsed instanceof Error) throw new Error(runIsEmailUsed)

  if (runIsEmailUsed.length !== 0 || runIsEmailUsed.id) {
    return res.status(400).send("User exists")
  }

  //Hash password
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)

  //Create email token
  const emailToken = jwt.sign({ email }, config.get('jwtSecrets.emailSecret'), { expiresIn: '1h' })

  // Insert new user
  const date = Math.floor(Date.now() / 1000)
  try {
    const queryInsertUser = "INSERT INTO users (name,email,password,date) VALUES ($1,$2,$3,to_timestamp($4))"
    const runInsertUser = await runQuery(queryInsertUser, [name, email, hashPassword, date])
    if (runInsertUser instanceof Error) throw new Error(runInsertUser)

    await transporter.sendMail({
      to: email,
      subject: 'Confirm email',
      html: `${process.env.NODE_ENV === 'production' ? process.env.URL : 'http://localhost:3000'}/confirm/${emailToken}`
    })

    const queryInsertLink = `INSERT INTO links (email,token,typeoflink) VALUES ($1,$2,$3)`
    const runInsertLink = await runQuery(queryInsertLink, [email, emailToken, "activeemail"])
    if (runInsertLink instanceof Error) throw new Error(runInsertLink)

    res.send("Success register")
  } catch (err) {
    console.log(err);
    res.status(500).send("Server erorr")
  }
})


module.exports = router