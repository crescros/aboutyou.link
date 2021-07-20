const Client = require('./Client');

Client.warmDatabase();
Client.warmModels();

Client.ExpressInit();