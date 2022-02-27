/* eslint-disable linebreak-style */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable no-console */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable import/newline-after-import */
/* eslint-disable linebreak-style */
/* eslint-disable semi */
/* eslint-disable linebreak-style */
const res = require('express');
const express = require('express')
const path = require('path')
const { db } = require('./DB')
const server = express()
server.set('view engine', 'hbs')
server.set('views', path.join(__dirname, 'src', 'views'))
// принимаем данные из формы
server.use(express.urlencoded({ extended: true }))
const PORT = 3000
server.get('/', function (req, res) {
  const usersQuery = req.query
  let kotikiForRender = db.kotiki
  if (usersQuery.limit !== undefined && Number.isNaN(+usersQuery.limit) === false) {
    kotikiForRender = db.kotiki.slice(0, usersQuery.limit)
  }
  if (usersQuery.reverse !== undefined && usersQuery.reverse === 'true') {
    kotikiForRender = db.kotiki.reverse()
  }
  if (usersQuery.limit !== undefined && Number.isNaN(+usersQuery.limit) === false && usersQuery.reverse !== undefined && usersQuery.reverse === 'true') {
    kotikiForRender = db.kotiki.slice(0, usersQuery.limit)
    kotikiForRender = kotikiForRender.reverse()
  }
    res.render('main', { listOfKotiki: kotikiForRender })
})
server.post('/kotohran', (req, res) => {
const dataFromForm = req.body
db.kotiki.unshift(dataFromForm)
  res.redirect('/')
})
// Затычка на 404
server.get('*', function (req, res) {
    res.send(`<div>
    <h1>404</h1>
    <a href='/'>Link to main page</a>
    </div>`)
  })
// Сообщение об успешном запуске
server.listen(PORT, () => {
console.log(`Server has been started on port: ${PORT}`)
})