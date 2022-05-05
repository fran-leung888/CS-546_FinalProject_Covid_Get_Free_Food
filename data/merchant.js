const mongoCollections = require('../config/mongoCollections');
const merchants = mongoCollections.user();

const exportedMethods = {







    async getAllMerchant() {
        const merchantCollection = await merchants;
        return await merchantCollection.find({}).toArray();
    },



};


module.exports = exportedMethods;
