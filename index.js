const express = require('express')
const db = require('./models/db')
const bodyparser = require('body-parser')
const rout = require('./routes/routes')
const app = express()

app.set('port', process.env.PORT || 3000)

app.use(bodyparser.json())

db.connect(err => {
    if(!err) console.log('Connection established Successfully')
    else
    console.log('Connection Faild!' + JSON.stringify(err, undefined, 2))
})

app.use(rout)


app.listen(app.get('port'), () => console.log('Server has been loaded at port: ', app.get('port')))









