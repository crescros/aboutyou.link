const mongoose = require("mongoose");
const Prod = mongoose.model("Prod");
const { sendMessageToWebhook } = require("../utils");

class Product {
    constructor(name, description, token) {
        this.name = name;
        this.description = description;
        this.token = token;

        this.post(this.token.sub, this.name, this.description);
    }

    post(by, name, description) {
        const newProd = new Prod({
            by: this.token.sub,
            name: this.name,
            description: this.description,
            createdAt: Date.now(),
            active: 1
        });
    
        newProd.save();

        sendMessageToWebhook(by, name, description);
        console.log('hi')
        return 'hi';
    }
}

module.exports = Product;