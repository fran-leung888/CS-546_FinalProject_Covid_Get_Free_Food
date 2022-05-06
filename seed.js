const connection = require('./config/mongoConnection')

const users = require('./data/users')
const foods = require('./data/food')


/* Populate the database with samples */
async function main() {
      const db = await connection.dbConnection()


    db.dropDatabase()

      const merchant1 = await users.createMerchantSeed("merchant1","password","Sagaponack NYC"
          ,"merchant1.jpg","4 W 22nd St, New York, NY 10010","Excellent spot. Not pretentious, great food quality and friendly staff. Fluke Crudo was a dish to remember, and the Thai Milk Tea provided an excellent finish to the evening. Everything was cooked perfectly and not needlessly over-seasoned; natural fresh seafood flavors were able to shine through. Great for a casual date, would absolutely return."
          ,"2019364912")
          .catch((err) => console.log(err))

    const merchant2 = await users.createMerchantSeed("merchant2","password","Fiore's House of Quality"
        ,"merchant2.jpg","414 Adams St #2693, Hoboken, NJ 07030","Best mutz on planet Earth! John Sr has been making mutz there since the 60s. Their fresh mozzarella has a texture and taste that l have rarely found close duplication. Needs to be eaten at room temperature to appreciate properly. In my opinion, the best sandwich there is mutz and the Palma prosciutto."
        ,"2016591655")
        .catch((err) => console.log(err))

    const merchant3 = await users.createMerchantSeed("merchant3","password","Anthony David's"
        ,"merchant3.jpg","953 Bloomfield St, Hoboken, NJ 07030","Probably the best brunch place in Hoboken. Amazing food options and delicious cocktails, it’s a great spot for brunch."
        ,"2012228399")
        .catch((err) => console.log(err))

    const merchant4 = await users.createMerchantSeed("merchant4","password","Vito's Deli"
        ,"merchant4.jpg","806 Washington St A, Hoboken, NJ 07030","Definitely a good Italian spot to go to. All of it was on point, the staff was extremely friendly, efficient and fast. The store has a wide variety of items, very fresh food and well stocked.",
        "2017924944")
        .catch((err) => console.log(err))



    //这个 merchant4返回的就是id 懒得改了 问题不大
    const food1 = await foods.addFood("Be My Burger","10","served with your choice of bread, toppings and patty. meats are free-range, pasture raised, humanely raised, antibiotic, gluten and hormone-free"
        ,"food1.jpg","Fast Food","Burgers",
        merchant4,"99")
        .catch((err) => console.log(err))

       await connection.closeConnection()
}

main()