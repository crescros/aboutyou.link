const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const utils = require('../utils');

router.post('/ban', async (req, res, next) => {
    if(!req.headers.authorization) return res.sendStatus(401);

    let token = utils.validateJWT(next, req.headers.authorization);
    let admUser = await User.findOne({ _id: token.sub });
    if(!admUser) return res.json({ success: false, msg: "who are you?" });

    if(!admUser.isAdmin) return res.json({ success: false, msg: "you aren't an admin, are you?" });

    if(!req.body.user)
        return res.json({ success: false, msg: "no user id has been provided." });

    let user = await User.findOne({ _id: req.body.user });
    if(!user) return res.json({ success: false, msg: "i couldn't find that user" });

    user.ban.banned = 1;
    user.ban.by = token.sub;
    user.ban.at = Date.now();
    user.ban.reason = req.body.reason ? req.body.reason : "Default Ban Reason.";

    user.save();

    return res.json({ success: true, ban: user.ban })
})

module.exports = router;