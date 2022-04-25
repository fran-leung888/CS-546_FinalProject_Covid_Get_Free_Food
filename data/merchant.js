const mongoCollections = require('../config/mongoCollections');
const merchant = mongoCollections.merchant;

const exportedMethods = {

    async addMerchant(foodName,price,foodDes,filename) {

        //todo 数据验证

        let newItem = {
            foodName: foodName,
            price: price,
            foodDes: foodDes,
            filename: filename
        }

        const merchantCollection = await merchant()

        const insert = await merchantCollection.insertOne(newItem)

        return await this.get(insert.insertedId)


    },

    async getAllFood() {
        const merchantCollection = await merchant();
        return await merchantCollection.find({}).toArray();
    },

    async getFoodByFilter(filterObj) {
        const foodCollection = await food();

        //一二级 日期 餐厅 关键词 有库存
        return await foodCollection.find(filterObj).toArray();
    }

};




module.exports = exportedMethods;
