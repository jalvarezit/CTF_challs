const express         	= require('express');
const router          	= express.Router();
const { evaluateCsp } = require('../utils');

router.post('/evaluate', async (req, res) => {
	const { csp } = req.body;
    try {
        cspIssues = await evaluateCsp(csp);
        res.json(cspIssues)
            
    } catch (error) {
        res.status(400).send();
    }
})

module.exports = router;