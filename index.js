const express = require('express')
const handlebars = require('express-handlebars')
const app = express()

const fortune = require('./src/lib/fortune')

const port = process.env.PORT || 3000

app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

// app.enable('view cache');

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/about', (req, res) => {

  res.render('about', {fortune: fortune.getFortune()})
})

app.use((req, res) => {
  res.status(404)
  res.render('404')
})

app.use((error, erq, res, next) => {
  console.error(error.message)
  res.status(500)
  res.render('500')
})

app.listen(port, console.log(`Server started and http://localhost:${port}`))
