require('dotenv').config()
require("./db/mongo")
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')


const bookRoute = require("./routes/book")
const userRoute = require("./routes/users")
const transRoute = require("./routes/transaction")
const authRoute = require("./routes/auth")
// const cartRoute = require("./routes/cart")
const sessionMiddleware = require("./middleware/cart")

// mongoose.connect(
//   process.env.MONGODB_URL_PRODUCT,
//   {useNewUrlParser: true,  useUnifiedTopology: true })

app.set("view engine", "ejs")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));
app.use(cookieParser(process.env.SIGN_COOKIES))

// app.use(sessionMiddleware)


app.use( bookRoute)
app.use( "/users",  userRoute)
app.use(transRoute)
app.use(authRoute)
// app.use(cartRoute)

const PORT = process.env.PORT || 3000
// listen for reqs :)
app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
