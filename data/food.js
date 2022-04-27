const mongoCollections = require('../config/mongoCollections');
const foodCollection = mongoCollections.food;
const uuid = require('uuid/v4');
const { ObjectId } = require('mongodb');

const exportedMethods = {
    async getAllFood() {
        const foodCollection = await foodCollection();
        return await foodCollection.find({}).toArray();
    },

    async getFoodByFilter(filterObj) {
        const foodCollection = await foodCollection();

        //一二级 日期 餐厅 关键词 有库存
        return await foodCollection.find(filterObj).toArray();
    },

    async addFood(foodName, price, foodDes, filename) {

        //todo 数据验证

        let newItem = {
            foodName: foodName,
            price: price,
            foodDes: foodDes,
            filename: filename
        }

        const merchantCollection = await foodCollection();

        const insert = await merchantCollection.insertOne(newItem)
        //console.log(insert);

        //console.log(insert.insertedId);
        return this.getFood(insert.insertedId.toString())


    },

    async getFood(_id) {


        const foodCollection1 = await foodCollection();

        const objId = ObjectId.createFromHexString(_id);


        const food = await foodCollection1.findOne({
            _id: objId
        });

        return food;
    },

};




module.exports = exportedMethods;
