const mongoCollections = require('../config/mongoCollections');
const foodCollection = mongoCollections.food;
const orderCollection = mongoCollections.order;
const userData = require('./users');
const uuid = require('uuid/v4');
const { ObjectId } = require('mongodb');

const exportedMethods = {
    async getAllFood() {
        const foodCollection1 = await foodCollection();
        return await foodCollection1.find({}).toArray();
    },

    async getFoodByFilter(filterObj) {
        const foodCollection1 = await foodCollection();

        //一二级 日期 餐厅 关键词 有库存
        return await foodCollection1.find(filterObj).toArray();
    },

    async updateFood(_id,updateObj) {

        //todo 数据验证





        const foodCollection1 = await foodCollection();


        const insert = await foodCollection1.updateOne(  { _id:ObjectId.createFromHexString(_id)} , { $set: updateObj } )

        //console.log(insert);

        //console.log(insert.insertedId);
        return this.getFood(_id)


    },

    async addFood(foodName, foodPrice, foodDes, filename,foodCategory1,foodCategory2,merchantId,stock) {

        //todo 数据验证

        let newItem = {
            foodName: foodName,
            foodPrice: foodPrice,
            foodDes: foodDes,
            filename: filename,
            foodCategory1: foodCategory1,
            foodCategory2: foodCategory2,
            merchantId: merchantId,
            stock: stock
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

    async getFoodByMerchant(merchantId) {


        const foodCollection1 = await foodCollection();


        const food = await foodCollection1.find({
            merchantId: merchantId
        }).toArray();

        return food;
    },


    async orderFood(foodId,userId,amount) {

        //todo <=0则不可以订了
        const foodCollection1 = await foodCollection();

        foodId = ObjectId.createFromHexString(foodId);


        // 产生一条订单
        //通过foodid 查到food详情
        const curFood=await foodCollection1.findOne({_id:foodId})
        await userData.createOrder(userId,curFood.foodName,curFood.foodPrice,amount,curFood.foodPrice*amount,curFood.filename)



        // 食物当前库存-1


        const updateRes = await foodCollection1.updateOne(
            {_id: foodId},
            {$inc: {stock: -1*amount}}


        );


        const food = await foodCollection1.findOne({
            _id: foodId
        });

        return food;
    },

};




module.exports = exportedMethods;
