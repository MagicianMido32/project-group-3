const jwt = require('jsonwebtoken');
var config = require('../config.json');

function checkJWT(req, res, next) {
	const token = req.session.jwt;
	if (token == null) return res.sendStatus(401);

	jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) return res.sendStatus(403);
		req.user = user;
		next();
	});
}

module.exports = checkJWT;
