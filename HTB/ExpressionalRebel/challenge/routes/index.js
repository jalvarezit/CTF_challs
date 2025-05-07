const path            	= require('path');
const express         	= require('express');
const router          	= express.Router();
const isLocal		  	= require('../middleware/isLocal.middleware')
const {validateSecret} 	= require('../utils');

router.get('/', (req, res) => {
	res.render('home');
});

router.get('/deactivate',isLocal, async (req, res) => {
	const { secretCode } = req.query;
	if (secretCode){
		const success = await validateSecret(secretCode);
		res.render('deactivate', {secretCode, success});
	} else {
		res.render('deactivate', {secretCode});
	}
});

module.exports = router;