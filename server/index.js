const express = require('express')
const app = express()
app.use(require('express').json());
const morgan = require('morgan')
const path = require('path');
const socketio = require('socket.io');

app.use(morgan('dev'))

app.use(express.static(path.join(__dirname, './public')))

//404 handler
app.use((req, res, next) => {
    const error = Error(`Page not found(${req.url})`)
    error.status = 404
    next(error)
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
})


//500 handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).send(`
    <html>
      <body>
        <h1 style = color:crimson>${err}</h1>
        <p>${err.stack}</p>
      </body>
    </html>`)
  })

//listen on port
const port = process.env.PORT || 3035;

const init = () => {
  try {
    const server = app.listen(port, () => console.log(`listening on port ${port}`));
    const io = socketio(server);
    require("./sockets")(io);
  }
  catch (err) {
    console.log(err);
  }
}

init();

