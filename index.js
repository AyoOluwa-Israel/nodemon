// require("dotenv").config();
// const colors = require("colors");
const nodemailer = require("nodemailer");

const express = require("express");
const app = express();
const cors = require("cors");

// const notFoundMiddleware = require("./middleware/notFound");
// const errorHandlerMiddleware = require("./middleware/errorHandler");
// const connectDB = require("./config/db");

// const authRoute = require("./routes/authRoutes");
// const dogRoute = require("./routes/dogRoute");

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.post("/", async (req, res) => {
  const { firstName, lastName, email, message } = req.body

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: "ayooluwa.israel@dynamixity.com",
      pass: "Ayooluwa1.",
    },
  });

  await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });

  const mailData = {
    from: {
      name: "IzzyTest",
      address: "ayooluwa.israel@dynamixity.com",
    },
    replyTo: "ayooluwa.israel@dynamixity.com",
    to: email,
    subject: `form message`,
    text: "message",
    html: "message",
  };

  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });

  res.status(200).json({ status: "OK" });
});

// app.use("/api/v1/auth", authRoute);
// app.use("/api/v1/dog", dogRoute);

// app.use(notFoundMiddleware);
// app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    // await connectDB();
    app.listen(port, console.log(`Server is running on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();

module.exports = app;
