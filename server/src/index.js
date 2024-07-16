require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yaml");
const fs = require("fs");
const path = require("path");

// Bảo mật websiute
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

// Database
const connection = require("./db");

// Routes
const userRoutes = require("../routes/users");
const authRoutes = require("../routes/auth");
const podcastRoutes = require("../routes/podcasts");
const playListRoutes = require("../routes/playLists");
const bookRoutes = require("../routes/books");
const bookListRoutes = require("../routes/bookLists");
const searchRoutes = require("../routes/search");

const app = express();
const port = process.env.PORT || 4000;

connection();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);
app.use(helmet());
app.use(express.json());

// Swagger setup
const file = fs.readFileSync(path.resolve("swagger.yaml"), "utf8");
const swaggerDocument = YAML.parse(file);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API routes
app.use("/api/users", userRoutes);
app.use("/api/login", authRoutes);
app.use("/api/podcasts", podcastRoutes);
app.use("/api/playlists/", playListRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/booklists/", bookListRoutes);
app.use("/api/", searchRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to Avowithmie-Server || Duc Dat & Thao My ');
})

// Server start
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
