var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var session = require('express-session');
var bodyparser = require('body-parser');
/* var http = require('http');
var io = require('socket.io')(http); */

let conn = mysql.createConnection({
    host: 'localhost',
    user: 'hostell',
    password: '123123',
    database: 'test'
});
router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
router.use(bodyparser.urlencoded({ extended: true }));
router.use(bodyparser.json());

/* GET home page. */
router.get('/', function(req, res) {
    res.render('login', { title: 'LogInPage' });
});
router.get('/index', function(req, res, next) {
    res.render('index', { title1: 'Express' });
});
router.get('/tabs', function(req, res) {
    res.render('/tabs', { title2: 'TabsPage' });
});
router.get('/shirt', function(req, res) {
    res.render('Shirt', { title3: 'Shirt Pages' })
})

/* GET login backend */
router.post('/auth', (requst, response) => {
    var name_node = requst.body.name_node;
    var passwd_node = requst.body.passwd_node;
    if (name_node && passwd_node) {
        conn.query('select * from nodejs_sql where name_node = ? and passwd_node = ?', [name_node, passwd_node], (error, results, fields) => {
            if (results.length > 0) {
                requst.session.loggedin = true;
                requst.session.name_node = name_node;
                response.redirect('/index');
            } else {
                response.send('name หรื่อ password ไม่ถูกต้อง');


            }
            response.end();
        });
    } else {
        response.send('Plass enter name and password');
        response.redirect('/');
    }
});
router.post('/regisauth', (req, res) => {
    var name_node = req.body.name_node;
    var passwd_node = req.body.passwd_node;
    var city = req.body.city;
    var email = req.body.email;
    if (name_node && passwd_node && city && email) {
        conn.query('INSERT INTO nodejs_sql SET ? ', [name_node, passwd_node, city, email], (error, results, fields) => {
            if (results == 0) {
                req.session.loggedin = true;
                res.send('you register ok');
            } else {
                res.send('you register no ow3-includek')
            }
        });
    }
})
router.get('/logout', function(req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});

/* io.sockets.on('connection', function(socket) {
    socket.on('username', function(username) {
        socket.username = username;
        io.emit('is_online', "🔵 <i>" + socket.username + "join the chat...</i>");
    });
    socket.on('disconnect', function(username) {
        io.emit('is_online', "🔴 <i>" + socket.username + "lift the chat...</i>");
    });
    socket.on('chat_massege', function(massege) {
        io.emit('chat_massege', "<strong>" + socket.username + "</strong>:" + massege);
    });
}) */

module.exports = router;