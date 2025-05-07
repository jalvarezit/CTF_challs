module.exports = function isLocal(req, res, next) {
    if(req.socket.remoteAddress === '127.0.0.1' && req.header('host') === '127.0.0.1:1337'){
		next()
	} else {
		res.status(401);
		res.render('unauthorized');
	}
};