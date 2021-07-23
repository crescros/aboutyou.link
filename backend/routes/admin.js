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

    return res.json({ success: true, ban: user.ban });
});

router.patch('/editbio', async (req, res, next) => {
    if(!req.headers.authorization) return res.sendStatus(401);

    let token = utils.validateJWT(next, req.headers.authorization);
    let admUser = await User.findOne({ _id: token.sub });
    if(!admUser) return res.json({ success: false, msg: "who are you?" });

    if(!admUser.isAdmin) return res.json({ success: false, msg: "you aren't an admin, are you?" });

    if(!req.body.user)
        return res.json({ success: false, msg: "no user id has been provided." });
    if(!req.body.newbio)
        return res.json({ success: false, msg: "no newbio could be found" });

    let user = await User.findOne({ _id: req.body.user });
    if(!user) return res.json({ success: false, msg: "no user could be found" });

    user.bio = req.body.newbio;

    user.save();
    return res.json({ success: true, bio: user.bio });
});

router.patch('/verifyuser', async (req, res, next) => {
    if(!req.headers.authorization) return res.sendStatus(401);

    let token = utils.validateJWT(next, req.headers.authorization);
    let admUser = await User.findOne({ _id: token.sub });
    if(!admUser) return res.json({ success: false, msg: "who are you?" });

    if(!admUser.isAdmin) return res.json({ success: false, msg: "you aren't an admin, are you?" });

    if(!req.body.user)
        return res.json({ success: false, msg: "no user id has been provided." });

    let user = await User.findOne({ _id: req.body.user });
    if(!user) return res.json({ success: false, msg: "no user could be found" });

    if(user.verified.is) return res.json({ success: false, msg: "user is already verified" });
    user.verified.is = 1;
    user.verified.startDate = Date.now();

    user.save();

    return res.json({ success: true, verified: user.verified });
});

router.post('/warnuser', async (req, res, next) => {
    if(!req.headers.authorization) return res.sendStatus(401);

    let token = utils.validateJWT(next, req.headers.authorization);
    let admUser = await User.findOne({ _id: token.sub });
    if(!admUser) return res.json({ success: false, msg: "who are you?" });

    if(!admUser.isAdmin) return res.json({ success: false, msg: "you aren't an admin, are you?" });

    if(!req.body.user || !req.body.reason)
        return res.json({ success: false, msg: "no user id or reason has been provided." });

    let user = await User.findOne({ _id: req.body.user });
    if(!user) return res.json({ success: false, msg: "no user could be found" });

    user.warns.push({ by: token.sub, reason: req.body.reason, at: Date.now() });
    user.save();

    return res.json({ success: true, warns: user.warns });
});

router.patch('/removewarn', async (req, res, next) => {
    if(!req.headers.authorization) return res.sendStatus(401);

    let token = utils.validateJWT(next, req.headers.authorization);
    let admUser = await User.findOne({ _id: token.sub });
    if(!admUser) return res.json({ success: false, msg: "who are you?" });

    if(!admUser.isAdmin) return res.json({ success: false, msg: "you aren't an admin, are you?" });

    if(!req.body.user || !req.body.warnid)
        return res.json({ success: false, msg: "no user id or warnid has been provided." });

    let user = await User.findOne({ _id: req.body.user });
    if(!user) return res.json({ success: false, msg: "no user could be found" });

    user.warns = user.warns.filter(warn => warn._id != req.body.warnid);

    user.save();

    return res.json({ success: true, warns: user.warns });
});

module.exports = router;