const mongoCollections = require('../config/mongoCollections');
const foodCollection = mongoCollections.food;
const orderCollection = mongoCollections.order;
const userData = require('./users');
const uuid = require('uuid/v4');
const {ObjectId} = require('mongodb');

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDate(date) {
    return (
        [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-') +
        ' ' +
        [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            padTo2Digits(date.getSeconds()),
        ].join(':')
    );
}

const exportedMethods = {
    async getAllFood() {
        const foodCollection1 = await foodCollection();
        return await foodCollection1.find({}).toArray();
    },

    async getFoodByFilter(filterObj,likesOrder) {
        const foodCollection1 = await foodCollection();

        if(likesOrder===1){
            return await foodCollection1.find(filterObj).sort({likes: -1}).toArray();

        }
        return await foodCollection1.find(filterObj).toArray();

    },

    async updateFood(_id, foodName, foodPrice, foodDes, filename,stock) {

        let setObj={}

        if (!foodName) throw 'You must provide a foodName';
        if (typeof foodName !== 'string') throw 'foodName must be a string';
        if (foodName.trim() === '') throw 'foodName all empty spaces are not valid';
        if (foodName.length < 4) throw 'foodName must longer than 4 characters'
        setObj.foodName=foodName

        if (!   (/^\+?[1-9]\d*$/.test(foodPrice))     ) {
            throw 'foodPrice must be a positive int';
        }
        setObj.price=parseInt(foodPrice)

        if (!foodDes) throw 'You must provide a foodDes';
        if (typeof foodDes !== 'string') throw 'foodDes must be a string';
        if (foodDes.trim() === '') throw 'foodDes all empty spaces are not valid';
        if (foodDes.length < 4) throw 'foodDes must longer than 4 characters'
        setObj.foodDes=foodDes

        //这里是可以没有的
        if (filename){
            setObj.filename="public/uploads/"+filename
        }

        if (!   (/^\+?(0|[1-9]\d*)$/.test(stock))     ) {
            throw 'stock must be a positive int or 0';
        }
        setObj.stock=stock





        const foodCollection1 = await foodCollection();



        const insert = await foodCollection1.updateOne({_id: ObjectId(_id)}, {$set: setObj})

        //console.log(insert);

        //console.log(insert.insertedId);
        return this.getFood(_id)


    },

    async deleteComment(commentId, userId) {

        const foodCollection1 = await foodCollection();


        const food = await foodCollection1.findOne({
            "comment.commentId": commentId,
            "comment.userId": userId
        });

        if (!food) {
            //todo 外面没catch
            throw "no right to do this"
        } else {
            const res = await foodCollection1.updateOne({
                    _id: food._id
                },
                {$pull: {comment: {commentId: commentId}}});
        }

        console.log(food);


    },

    async createComment(foodId, userId, userName, commentContent) {

        if (!commentContent) throw 'You must provide a commentContent';
        if (typeof commentContent !== 'string') throw 'commentContent must be a string';
        if (commentContent.trim() === '') throw 'commentContent all empty spaces are not valid';
        if (commentContent.length < 4) throw 'commentContent must longer than 4 characters'

        let time = formatDate(new Date());

        const foodCollection1 = await foodCollection();

        const newOrderInfo =

            {
                commentId: uuid(),
                foodId: foodId,
                userId: userId,
                userName: userName,
                commentContent: commentContent,
                // 2021-10-24 16:21:23 (yyyy-mm-dd hh:mm:ss)
                time: time
            }

        ;


        const updatedInfo = await foodCollection1.updateOne(
            {_id: ObjectId(foodId)},
            {$push: {comment: newOrderInfo}}
        );

        if (updatedInfo.modifiedCount === 0) {
            throw 'could not update band successfully';
        }


    },

    async addFood(foodName, foodPrice, foodDes, filename, foodCategory1, foodCategory2, merchantId, stock) {

        if (!foodName) throw 'You must provide a foodName';
        if (typeof foodName !== 'string') throw 'foodName must be a string';
        if (foodName.trim() === '') throw 'foodName all empty spaces are not valid';
        if (foodName.length < 4) throw 'foodName must longer than 4 characters'


        if (!   (/^\+?[1-9]\d*$/.test(foodPrice))     ) {
            throw 'foodPrice must be a positive int';
        }

        if (!foodDes) throw 'You must provide a foodDes';
        if (typeof foodDes !== 'string') throw 'foodDes must be a string';
        if (foodDes.trim() === '') throw 'foodDes all empty spaces are not valid';
        if (foodDes.length < 4) throw 'foodDes must longer than 4 characters'

        if (!filename) throw 'must upload a food image';

        if (!foodCategory1) throw 'You must provide a foodCategory1';
        if (!foodCategory2) throw 'You must provide a foodCategory2';


        if (!   (/^\+?(0|[1-9]\d*)$/.test(stock))     ) {
            throw 'stock must be a positive int or 0';
        }


        let newItem = {
            foodName: foodName,
            foodPrice: parseInt(foodPrice),
            foodDes: foodDes,
            filename:"public/uploads/"+filename,
            foodCategory1: foodCategory1,
            foodCategory2: foodCategory2,
            merchantId: merchantId,
            stock: parseInt(stock)
        }

        const merchantCollection = await foodCollection();

        const insert = await merchantCollection.insertOne(newItem)
        //console.log(insert);

        //console.log(insert.insertedId);
        return this.getFood(insert.insertedId.toString())


    },

    async getFood(_id) {


        const foodCollection1 = await foodCollection();

        const objId = ObjectId(_id);


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

    async getFoodInList(idList) {


        const foodCollection1 = await foodCollection();

        for (let key in idList) {
            idList[key]=ObjectId(idList[key])
        }
        const food=await foodCollection1
            .find({_id: {$in: idList}})
            .toArray();


        return food;
    },


    async orderFood(foodId, userId, amount) {

        //todo <=0则不可以订了
        const foodCollection1 = await foodCollection();

        foodId = ObjectId(foodId);


        // 产生一条订单
        //通过foodid 查到food详情
        const curFood = await foodCollection1.findOne({_id: foodId})

        if (!curFood) {
            throw "no food found";
        }

        if (amount<1) {
            throw "check your amount";
        }
        if (curFood.stock < amount) {
            throw "check your amount";
        }
        await userData.createOrder(userId, curFood.foodName, curFood.foodPrice, amount, curFood.foodPrice * amount, curFood.filename)


        // 食物当前库存-1


        const updateRes = await foodCollection1.updateOne(
            {_id: foodId},
            {$inc: {stock: -1 * amount}}
        );


        const food = await foodCollection1.findOne({
            _id: foodId
        });

        return food;
    },

};


module.exports = exportedMethods;
