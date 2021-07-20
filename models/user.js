const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: mongoose.SchemaTypes.String,
    hash: mongoose.SchemaTypes.String,
    salt: mongoose.SchemaTypes.String,
    email: mongoose.SchemaTypes.String,
    createdAt: mongoose.SchemaTypes.Date,
    isAdmin: mongoose.SchemaTypes.Boolean,
    verified: {
        is: mongoose.SchemaTypes.Boolean,
        startDate: mongoose.SchemaTypes.Date
    },
    adminPanel: {
        hasAccess: mongoose.SchemaTypes.Boolean,
        lastAccess: mongoose.SchemaTypes.Date,
        lastAction: mongoose.SchemaTypes.String
    },
    reputation: mongoose.SchemaTypes.Number,
    links: [{
        link: mongoose.SchemaTypes.String,
        addedAt: mongoose.SchemaTypes.Date,
        name: mongoose.SchemaTypes.String,
        description: mongoose.SchemaTypes.String
    }]
});

mongoose.model('User', UserSchema);