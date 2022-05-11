const express = require("express");
const { use } = require("./routes/date");
const app = express()
const notification = require('./routes/notification');

app.use(express.json())

app.use('/api/', require('./routes/date'))
app.use('/api/', require('./routes/appointment'))
app.use(express.urlencoded({ extended: false }));

setInterval(() => {
    notification.Time()}
    ,3e+6)

app.listen(5000, () => {
    console.log("Listening on port 5000")
})