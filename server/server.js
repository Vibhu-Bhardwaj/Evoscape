const express = require("express");
const mongoose = require("mongoose");
const Product = require('./models/Product');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const auth = require("./middleware/auth");
require('dotenv').config();
const authRoutes = require('./authRoutes/authRoutes');
const googleAuthRoutes = require('./authRoutes/googleAuthRoutes');
const chatRoutes = require('./chatRoutes/chatRoutes');
const profileRoutes = require('./profileRoutes/profileRoutes');
const Message = require('./models/Message');

const nodemailer = require("nodemailer");
const User = require('./models/User');
const bcrypt = require('bcrypt');
const crypto = require("crypto");


const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.log("Connection failed!");
    console.log(error);
  });

app.use('/', authRoutes);
app.use('/', googleAuthRoutes);
app.use('/', profileRoutes);
app.use('/', chatRoutes);


app.post("/add_product", auth, async (req, res) => {
  try {
    // Create a new Product document
    const product = new Product({
      useremail: req.user.userEmail,
      title: req.body.title,
      description: req.body.description,
      address: req.body.address,
      price: req.body.price,
      owner: req.body.name,
      ownerpicture: req.body.image,
      catagory: req.body.catagory,
      subcatagory: req.body.subcatagory,
    });

    // Save the uploaded files in pic1 to pic12 fields
    for (let i = 0; i < req.body.uploadedFiles.length && i < 12; i++) {
      const fieldName = `productpic${i + 1}`;
      product[fieldName] = req.body.uploadedFiles[i];
    }
    // Save the product document
    await product.save();

    console.log("The product has been saved successfully.");
    res.status(200).send("The product has been saved successfully.");
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to save the product.");
  }
});

app.get("/myads_view", auth, async (req, res) => {
  try {
    const useremail = req.user.userEmail;
    const products = await Product.find({ useremail });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.delete("/myads_delete/:id", auth, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      useremail: req.user.userEmail,
    });

    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }
    else {

      //! Delete associated messages
      await Message.deleteMany({ product_id: req.params.id });

      // Delete associated chats
      await Message.deleteMany({
        $or: [
          { from: req.user.userEmail, product_id: req.params.id },
          { to: req.user.userEmail, product_id: req.params.id },
        ],
      });
      //! Deletion Completed

      // delete the ownerpicture from Cloudinary if it exists
      if (product.ownerpicture) {
        const publicId = product.ownerpicture.match(/\/v\d+\/(\S+)\.\w+/)[1];
        const result = await cloudinary.uploader.destroy(publicId);
        console.log(result);
      }

      // delete the product pictures from Cloudinary if they exist
      for (let i = 1; i <= 12; i++) {
        const productPic = `productpic${i}`;
        if (product[productPic]) {
          const publicId = product[productPic].match(/\/v\d+\/(\S+)\.\w+/)[1];
          const result = await cloudinary.uploader.destroy(publicId);
          console.log(result);
        }
      }

      res.send(product);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Server Error" });
  }
});

app.post("/previewad/:id", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }
    else {
      let own = false;
      if (product.useremail === req.user.userEmail) {
        own = true;
      }
      res.send({ product, own });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/previewad/notloggedin/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    } else {
      res.send({ product });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/getProducts", async (req, res) => {
  const products = await Product.find();
  res.status(200).send(products);
});

app.get("/getProductsbyCategory/:category", async (req, res) => {
  const { category } = req.params;
  const products = await Product.find({
    $or: [{ catagory: category }, { subcatagory: category }],
  });
  res.status(200).send(products);
});

app.get("/search", async (req, res) => {
  const { q } = req.query;
  try {
    const products = await Product.find({
      title: { $regex: q, $options: "i" },
    });
    res.status(200).send(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


app.get("/getProductsbyemail", async (req, res) => {
  const { useremail } = req.query;
  const products = await Product.find({ useremail: useremail });
  res.status(200).send(products);
});



function generateResetToken() {
  return crypto.randomBytes(20).toString('hex');
}
function sendPasswordResetEmail(email, token) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // your email address
      pass: process.env.EMAIL_PASS // your email password
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset',
    html: `<p>You are receiving this email because you (or someone else) have requested the reset of the password for your account.</p>
           <p>Please click on the following link to reset your password:</p>
           <p><a href="http://localhost:3000/reset-password?token=${token}&email=${email}">Reset Password Link</a></p>
           <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending password reset email:", error);
    } else {
      console.log("Password reset email sent:", info.response);
    }
  });
}

app.post("/forgot-password", (request, response) => {
  const { email } = request.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return response.status(404).json({ message: "User not found" });
      }

      const resetToken = generateResetToken();
      
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

      // Save the updated user document
      user.save()
        .then(() => {
          // Send email with reset link
          sendPasswordResetEmail(user.email, resetToken);
          response.json({ message: "Reset password link sent to your email" });
        })
        .catch((error) => {
          console.error("Error saving reset token:", error);
          response.status(500).json({ message: "Internal server error" });
        });
    })
    .catch((error) => {
      console.error("Error finding user:", error);
      response.status(500).json({ message: "Internal server error" });
    });
});


// Add Password Reset Route
app.post("/reset-password", (request, response) => {
  const { email, token, newPassword } = request.body;

  // Find the user by email and reset token
  User.findOne({ email, resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } })
    .then((user) => {
      if (!user) {
        return response.status(400).json({ message: "Invalid or expired reset token" });
      }

      // Hash the new password
      bcrypt.hash(newPassword, 10)
        .then((hashedPassword) => {
          // Update user's password
          user.password = hashedPassword;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;

          // Save the updated user document
          user.save()
            .then(() => {
              response.json({ message: "Password reset successfully" });
            })
            .catch((error) => {
              console.error("Error saving new password:", error);
              response.status(500).json({ message: "Internal server error" });
            });
        })
        .catch((error) => {
          console.error("Error hashing password:", error);
          response.status(500).json({ message: "Internal server error" });
        });
    })
    .catch((error) => {
      console.error("Error finding user:", error);
      response.status(500).json({ message: "Internal server error" });
    });
});













app.listen(5000, () => {
  console.log("Server started on port 5000!");
});
