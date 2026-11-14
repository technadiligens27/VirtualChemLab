
const dns = require("node:dns")

// ==========================================
// DNS CONFIGURATION
// ==========================================

dns.setServers([
  "8.8.8.8",
  "1.1.1.1",
])

// ==========================================
// IMPORTS
// ==========================================

const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")

const session = require("express-session")
const MongoStore = require("connect-mongo").default

const connectDatabase = require("./config/database")

const authRoutes = require(
  "./routes/authRoutes"
)

const feedbackRoutes = require(
  "./routes/feedbackRoutes"
)

// ==========================================
// ENVIRONMENT VARIABLES
// ==========================================

dotenv.config()

const app = express()

const isProduction =
  process.env.NODE_ENV === "production"

const port = process.env.PORT || 5000

// ==========================================
// TRUST PROXY
// ==========================================

if (isProduction) {
  app.set("trust proxy", 1)
}

// ==========================================
// CORS
// ==========================================

app.use(
  cors({
    origin: process.env.CLIENT_URL,

    credentials: true,
  })
)

// ==========================================
// JSON MIDDLEWARE
// ==========================================

app.use(express.json())

// ==========================================
// START SERVER
// ==========================================

const startServer = async () => {

  try {

    // ======================================
    // CONNECT MONGODB FIRST
    // ======================================

    await connectDatabase()

    // ======================================
    // SESSION CONFIGURATION
    // ======================================

    app.use(
      session({
        name: "virtualLabSession",

        secret: process.env.SESSION_SECRET,

        resave: false,

        saveUninitialized: false,

        // Reuse existing Mongoose connection
        store: MongoStore.create({
          client: mongoose.connection.getClient(),

          collectionName: "sessions",

          ttl: 7 * 24 * 60 * 60,
        }),

        cookie: {
          httpOnly: true,

          secure: isProduction,

          sameSite: isProduction
            ? "none"
            : "lax",

          maxAge:
            7 * 24 * 60 * 60 * 1000,
        },
      })
    )

    // ======================================
    // API HEALTH CHECK
    // ======================================

    app.get("/", (request, response) => {
      response.json({
        message:
          "Virtual Chemistry Lab API is running.",
      })
    })

    // ======================================
    // AUTHENTICATION ROUTES
    // ======================================

    app.use("/api/auth", authRoutes)

    // ======================================
    // FEEDBACK ROUTES
    // ======================================

    app.use(
      "/api/feedback",
      feedbackRoutes
    )

    // ======================================
    // LISTEN FOR REQUESTS
    // ======================================

    app.listen(port, () => {
      console.log(
        `Server running on http://localhost:${port}`
      )
    })

  } catch (error) {

    console.error(
      "Server startup failed:",
      error.message
    )

    process.exit(1)

  }
}

startServer()
