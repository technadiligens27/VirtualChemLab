const express = require("express")

const {
  guestSignIn,
  getCurrentSession,
  signOut,
} = require(
  "../controllers/authController"
)

const router = express.Router()

router.post(
  "/guest-signin",
  guestSignIn
)

router.get(
  "/session",
  getCurrentSession
)

router.post(
  "/signout",
  signOut
)

module.exports = router