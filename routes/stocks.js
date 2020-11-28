const express = require('express');
const router = express.Router();
const data = require('../data');
const companies = data.companies;
const traders = data.traders;

router.get('/stocksList', async (req, res) => {
    if(!req.session.user) {
        return res.status(403).render('users/notLoggedIn', {title: "Not Logged In", loggedIn: false});
    }
    try {
        let actionItem = "" + new Date() + ": Viewed the Stocks List.";
        const updateHistory = await traders.addTraderHistory(req.session.user._id, actionItem);
        const allCompanies = await companies.getAllCompanies();
        res.render('stocks/stocksList', {
            title: 'List of Stocks',
            loggedIn: true,
            allCompanies: allCompanies,
        });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.post('/');

module.exports = router;
