const express = require('express')
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser')
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require('dotenv').config();
const port = process.env.PORT || 3000
const paymentRoutes = require('./routers/PaymentRoutes');
app.use('/payment', paymentRoutes);

app.get('/' , (req , res)=>{
   res.render('index')
})


app.listen(port , ()=> console.log('> Server is up and running on port : ' + port))