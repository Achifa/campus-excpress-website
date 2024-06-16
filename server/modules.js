
module.exports = {
    express : require('express'),
    fs : require('fs'),
    path : require('path'),
    cookieParser : require('cookie-parser'),
    parser : require('body-parser'),
    mocha : require('mocha'),
    morgan : require('morgan'),
    cors : require('cors'),
    shortId : require('short-id'),
    jwt : require('jsonwebtoken'),
    bcrypt: require('bcryptjs'),
    io: require('socket.io')
}
