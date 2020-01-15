const runQuery = require('../config/queries')
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const config = require('config')
const transporter = require('../config/mail')

// @route GET  api/email
// @desc  Resend active email link
// @access Public
router.get('/resend/:email', async (req, res) => {
  const email = req.params.email
  try {
    const queryCheckEmailConfirmation = "SELECT emailconfirmed FROM users WHERE email=$1"
    const userConfirm = await runQuery(queryCheckEmailConfirmation, [email])
    if (userConfirm instanceof Error) throw new Error(userConfirm)

    if (userConfirm.emailconfirmed === undefined) {
      res.status(401).send("There is no user with that email")
    } else if (userConfirm.emailconfirmed) {
      res.status(401).send("This email have been arleady confirmed")
    } else {
      const queryDeleteOldLink = "DELETE FROM links WHERE email=$1"
      const runDeleteLink = await runQuery(queryDeleteOldLink, [email])
      if (runDeleteLink instanceof Error) throw new Error(runDeleteLink)

      const token = jwt.sign({ email }, config.get('jwtSecrets.emailSecret'), { expiresIn: '1h' })
      const queryInsertNewLink = "INSERT INTO links (email,token,typeoflink) VALUES ($1,$2,'activeemail')"
      const runInsertLink = await runQuery(queryInsertNewLink, [email, token])
      if (runInsertLink instanceof Error) throw new Error(runInsertLink)

      transporter.sendMail({
        to: email,
        subject: 'Resended: Confirm email',
        html: `${process.env.NODE_ENV === 'production' ? process.env.URL : 'http://localhost:3000'}/confirm/${token}`
      })
      res.send("Link resend")
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server erorr")
  }
})

// @route POST  api/email
// @desc  Confirm email
// @access Public
router.get('/confirm/:token', async (req, res) => {
  const token = req.params.token
  // Verify token
  try {
    const getRowWithToken = "SELECT * FROM links WHERE token = $1 AND typeoflink = 'activeemail'"
    const row = await runQuery(getRowWithToken, [token]);
    if (row instanceof Error) throw new Error(row)

    if (row.length === 0) {
      res.status(401).send("Invalid token")
    } else {
      jwt.verify(token, config.get('jwtSecrets.emailSecret'), async (error, decoded) => {
        // Check if errrs
        if (error !== null) {
          // USUWANIE Z BAZY linku dajacego error
          const deleteActiveEmail = "DELETE FROM links WHERE token = $1 AND typeoflink = 'activeemail'"
          const deleteRow = await runQuery(deleteActiveEmail, [token])
          if (deleteRow instanceof Error) throw new Error(deleteRow)

          if (error.message === 'jwt expired') return res.status(401).send('Link expired')
          if (error.message === 'invalid token' || error.message === 'jwt malformed') return res.status(401).send('Invalid link')
          else return res.status(401).json({ error })
        }
        // If no error
        if (decoded) {
          const { email } = decoded
          const updateActiveEmail = "UPDATE users SET emailconfirmed = 'true' WHERE email = $1"
          //Update confirmation to true for email from token
          const activeemail = await runQuery(updateActiveEmail, [email])
          if (activeemail instanceof Error) throw new Error(activeemail)

          const deleteActiveEmail = "DELETE FROM links WHERE email = $1 AND typeoflink = 'activeemail'"
          const deleteRow = await runQuery(deleteActiveEmail, [email])
          if (deleteRow instanceof Error) throw new Error(deleteRow)
          res.send("Success confimed")
        }
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server erorr")
  }
})

module.exports = router