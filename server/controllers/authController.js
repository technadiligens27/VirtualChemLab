const User = require(
  "../models/User"
)

const guestSignIn = async (
  request,
  response
) => {
  try {
    const user = await User.create({
      signedInAt: new Date(),
    })

    request.session.regenerate(
      (sessionError) => {
        if (sessionError) {
          return response.status(500).json({
            success: false,

            message:
              "Could not start a secure session.",
          })
        }

        request.session.userId =
          user._id.toString()

        request.session.save(
          (saveError) => {
            if (saveError) {
              return response.status(500).json({
                success: false,

                message:
                  "Could not save session.",
              })
            }

            return response.status(201).json({
              success: true,

              message:
                "Guest signed in successfully.",
            })
          }
        )
      }
    )
  } catch (error) {
    console.error(error)

    return response.status(500).json({
      success: false,

      message:
        "Could not create guest user.",
    })
  }
}

const getCurrentSession = (
  request,
  response
) => {
  if (!request.session.userId) {
    return response.status(401).json({
      signedIn: false,
    })
  }

  return response.json({
    signedIn: true,
  })
}

const signOut = (
  request,
  response
) => {
  request.session.destroy(() => {
    response.clearCookie(
      "virtualLabSession"
    )

    return response.json({
      success: true,
    })
  })
}

module.exports = {
  guestSignIn,
  getCurrentSession,
  signOut,
}