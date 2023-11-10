const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");

require("dotenv").config();
const PORT = process.env.PORT;

app.use(cookieParser());
app.use(express.json());
// app.use(
//   cors({
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );
app.use(cors());

require("./utils/connection");

// const { notFound, errorHandler } = require("./middlerware/errroMiddleware");

// app.use(notFound);
// app.use(errorHandler);

const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");

app.use("/api/user", userRoutes);
app.use("/api/item", itemRoutes);

// if (process.env.NODE_ENV === "production") {
//   // require('./client')
//   app.use(express.static("./client/out"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve("./client/out/index.html"));
//   });
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running..");
//   });
// }

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
