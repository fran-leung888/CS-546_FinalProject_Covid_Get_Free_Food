const mongoCollections = require('../config/mongoCollections');
const merchants = mongoCollections.user();

const exportedMethods = {







    async getAllMerchant() {
        const merchantCollection = await merchants;
        return await merchantCollection.find({type:"merchant"}).toArray();
    },



};


module.exports = exportedMethods;
