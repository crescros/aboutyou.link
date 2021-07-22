const mongoose = require('mongoose');
const router = require('express').Router();   
const User = mongoose.model('User');

router.get('/:username', async (req, res, next) => {
    if(!req.params.username)    
        return res.json({ sucess: false, msg: "no username has been provided" });

    let user = await User.findOne({ username: req.params.username });
    if(!user) return res.json({ success: false, msg: "couldn't find any user" });

    return res.json({ success: true, user: user });
});

module.exports = router;