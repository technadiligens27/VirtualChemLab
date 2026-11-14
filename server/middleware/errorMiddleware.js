const errorMiddleware = (
  error,
  request,
  response,
  next
) => {
  console.error(error)

  response.status(500).json({
    message:
      "Something went wrong on the server.",
  })
}

module.exports = errorMiddleware