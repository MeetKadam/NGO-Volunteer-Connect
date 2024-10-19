require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./router/auth-router");
const ngouser = require("./router/ngouser-router");

const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const contactRoute = require("./router/contact-router");
const eventRoute = require("./router/eventRegis-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const Uploadrouter=require('./Routes/Upload')
const Apirouter=require('./Routes/Api')
const donationRouter=require('./router/donation-router')
const feedbackRouter=require('./router/feedback-router')




const PORT = 5000;

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
// Mount the Router: To use the router in your main Express app, you can "mount" it at a specific URL prefix
app.use(express.json())
app.use("/api/auth", router);
app.use("/api/ngo", ngouser);
app.use("/api/form", contactRoute);
app.use("/api/regis", eventRoute);
app.use("/api/data", serviceRoute);
app.use("/api/admin", adminRoute);
app.use('/upload',Uploadrouter)
app.use('/Api',Apirouter)
app.use("/api/donations", donationRouter); 
app.use("/api/feedback", feedbackRouter); 


app.post("/verify", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const crypto = require("crypto");

  const hmac = crypto.createHmac("sha256", "6JdtQv2u7oUw7EWziYeyoewJ");
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generated_signature = hmac.digest("hex");

  if (generated_signature === razorpay_signature) {
      res.status(200).json({ message: "Payment verified successfully" });
  } else {
      res.status(400).json({ message: "Payment verification failed" });
  }
});
app.use(errorMiddleware);

const Razorpay = require("razorpay");

app.post("/orders", async (req, res) => {
  const razorpay = new Razorpay({
    key_id: 'rzp_test_GcZZFDPP0jHtC4',  // Replace with your Razorpay key_id
    key_secret: '6JdtQv2u7oUw7EWziYeyoewJ', // Replace with your Razorpay key_secret
  });
  
  const options = {
    amount: req.body.amount,
    currency: req.body.currency,
    receipt: `receipt#${Math.random()}`,
  };
  
  try {
    const order = await razorpay.orders.create(options);
    res.json({ order_id: order.id });
  } catch (error) {
    console.error("Error creating order", error);
    res.status(500).send("Error creating order");
  }
});



connectDb().then(()=>{
app.listen(PORT, () => {
  console.log(`server is running at port: ${PORT}`);
});
});