const mongoCollections = require('../config/mongoCollections');
const food = mongoCollections.food;
const uuid = require('uuid/v4');

const exportedMethods = {
    async getAllFood() {
        const foodCollection = await food();
        return await foodCollection.find({}).toArray();
    },

    async getFoodByFilter(filterObj) {
        const foodCollection = await food();

        //一二级 日期 餐厅 关键词 有库存
        return await foodCollection.find(filterObj).toArray();
    }

};




module.exports = exportedMethods;
