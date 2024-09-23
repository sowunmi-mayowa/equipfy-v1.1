require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())
// app.use((req, res, next) => {
//     console.log(req.path, req.method)
//     next();
// })
if (app.get('env') == 'production') {
    app.use(morgan('common', { skip: function(req, res) { return res.statusCode < 400 }, stream: __dirname + '/../morgan.log' }));
  } else {
    app.use(morgan('dev'));
  }
app.use("/equipments", require("./routes/equipments"))

//mongoose connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
       const server = app.listen(process.env.PORT || 5000, () => {
  const port = server.address().port;
  console.log(`Express is working on port ${port}`);
});
    })
    .catch((error) => {
        console.log(error)
    })
