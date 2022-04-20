const mongoCollections = require('../config/mongoCollections');
const food = mongoCollections.food;
const uuid = require('uuid/v4');

const exportedMethods = {
    async getAllFood() {
        const foodCollection = await food();
        return await foodCollection.find({}).toArray();
    },

    async getFoodByName(key) {
        const foodCollection = await food();
        return await foodCollection.find({"name":key}).toArray();
    }

};




module.exports = exportedMethods;
