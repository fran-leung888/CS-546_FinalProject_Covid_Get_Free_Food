const connection = require('./config/mongoConnection')

const users = require('./data/users')
const foods = require('./data/food')


/* Populate the database with samples */
main()

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
        merchant1,"99")
        .catch((err) => console.log(err))


    const food2 = await foods.addFood("Steelhead Salmon Burger","10","Fresh salmon patty, avocado, cucumber, cilantro, spicy sesame aioli"
        ,"food2.jpg","Fast Food","Burgers",
        merchant1,"99")
        .catch((err) => console.log(err))

    const food3 = await foods.addFood("Classic Cheese Pizza","10","Pizza sauce and mozzarella."
        ,"food3.jpg","Fast Food","Pizza",
        merchant1,"99")
        .catch((err) => console.log(err))


    const food4 = await foods.addFood("La Pizza","10","Fior Di Latte, Tomato, and Basil."
        ,"food4.jpg","Fast Food","Pizza",
        merchant1,"99")
        .catch((err) => console.log(err))


    const food5 = await foods.addFood("Veggie Patty","10","Delicious vegan patties with lettuce, tomatoes, cucumbers, green peppers and red onions, all served on our freshly baked Hearty Multigrain bread."
        ,"food5.jpg","Fast Food","Sandwiches",
        merchant1,"99")
        .catch((err) => console.log(err))


    const food6 = await foods.addFood("Jersey Shore's Favorite","10","Provolone, ham and cappacuolo. Served Mike's Way with onions, lettuce, tomato, vinegar, oil, oregano, and salt."
        ,"food6.jpg","Fast Food","Sandwiches",
        merchant1,"99")
        .catch((err) => console.log(err))


    const food7 = await foods.addFood("American Dream Roll","10","Salmon, avocado and cucumber inside, with spicy king crab, snow crab,and mixed red tobiko on top."
        ,"food7.jpg","Asian","Sushi",
        merchant2,"99")
        .catch((err) => console.log(err))


    const food8 = await foods.addFood("El Fuerte","10","Grilled steak, grilled chicken, bacon, cream cheese, and avocado"
        ,"food8.jpg","Asian","Sushi",
        merchant2,"99")
        .catch((err) => console.log(err))


    const food9 = await foods.addFood("Kids Lo Mein","10","Stir-fried egg noodles, chicken, savory soy sauce"
        ,"food9.jpg","Asian","Noodle",
        merchant2,"99")
        .catch((err) => console.log(err))


    const food10 = await foods.addFood("Pad Thai","10","Contain peanut."
        ,"food10.jpg","Asian","Noodle",
        merchant2,"99")
        .catch((err) => console.log(err))

    const food11 = await foods.addFood("Chive & Pork","10","best"
        ,"food11.jpg","Asian","Dumplings",
        merchant2,"99")
        .catch((err) => console.log(err))


    const food12 = await foods.addFood("Pot Sticker (10 Pcs.) Combo","10","Pick up to two Potstickers: Pork Special, Beef Sensation, Chicken Experience or Veggie Natural. Soup with Hot & Sour Soup or Corn Chowder Soup."
        ,"food12.jpg","Asian","Dumplings",
        merchant2,"99")
        .catch((err) => console.log(err))


    const food13 = await foods.addFood("Tenders Box","10","Fried Chicken Tenders with a biscuit and two dipping sauces"
        ,"food13.jpg","Fried Food","Fried Chicken",
        merchant3,"99")
        .catch((err) => console.log(err))


    const food14 = await foods.addFood("6 Pc Chickenjoy Bucket","10","6 Pieces (3 legs, 3 thighs) of our signature crispy juicy bone-in fried chicken. Served with a side of gravy for dipping. Choose from regular and spicy."
        ,"food14.jpg","Fried Food","Fried Chicken",
        merchant3,"99")
        .catch((err) => console.log(err))


    const food15 = await foods.addFood("Fries","10","Most popular."
        ,"food15.jpg","Fried Food","Fries",
        merchant3,"99")
        .catch((err) => console.log(err))


    const food16 = await foods.addFood("Truffle Fries with Sea Salt & Pecorino Romano","10","Truffle Fries with Sea Salt & Pecorino Romano"
        ,"food16.jpg","Fried Food","Fries",
        merchant3,"99")
        .catch((err) => console.log(err))


    const food17 = await foods.addFood("Be My Fish N' Chips","10","Crispy golden fresh caught tilapia served with hand cut fries, house salad, and creamy white dipping sauce."
        ,"food17.jpg","Fried Food","Fried fish",
        merchant3,"99")
        .catch((err) => console.log(err))


    const food18 = await foods.addFood("Fish & Chips","10","Fish & Chips"
        ,"food18.jpg","Fried Food","Fried fish",
        merchant3,"99")
        .catch((err) => console.log(err))


    const food19 = await foods.addFood("Sopa de Pollo / Chicken Soup","10","homemade chicken soup, potatoes, carrots, celery, corn, cut spaghetti."
        ,"food19.jpg","Drink","Soup",
        merchant4,"99")
        .catch((err) => console.log(err))

    const food20 = await foods.addFood("Ten Vegetable","10","A thick, hearty tomato based soup loaded with fresh vegetables and herbs. (Small-70 calories, Medium-110 calories, Large-140 calories, Quart-280 calories) Ingredients: Water, crushed tomatoes (tomatoes, tomato puree, salt, ascorbic acid.), onions, carrots, celery, Idaho potatoes, zucchini, yellow squash, eggplant, parsnips, celery root, fennel, green beans, green peas, kosher salt, garlic (garlic, blended oil 25%), basil, blended oil, black pepper."
        ,"food20.jpg","Drink","Soup",
        merchant4,"99")
        .catch((err) => console.log(err))

    const food21 = await foods.addFood("Super Green Juice","10","Very nutritious blend all natural ingredients. Made with fresh kale / celery / cucumber & blended with orange juice. (most people add pineapple for extra flavor and nutrition). 20 oz"
        ,"food21.jpg","Drink","Juice",
        merchant4,"99")
        .catch((err) => console.log(err))

    const food22 = await foods.addFood("Morir Sonando","10","Delicious mix of freshly squeezed orange juice and evaporated milk with a hint of sugar and of vanilla extract. 20 oz"
        ,"food22.jpg","Drink","Juice",
        merchant4,"99")
        .catch((err) => console.log(err))

    const food23 = await foods.addFood("Casamigos Blanco","10","Our agaves are 100% Blue Weber, aged 7-9 years, from the rich clay soil of the Highlands of Jalisco, Mexico. Flavors of fruit with notes of vanilla and grapefruit."
        ,"food23.jpg","Drink","Liquor",
        merchant4,"99")
        .catch((err) => console.log(err))

    const food24 = await foods.addFood("Oyster Bay Sauvignon Blanc","10","New Zealand Marlborough Sauv Blanc"
        ,"food24.jpg","Drink","Liquor",
        merchant4,"99")
        .catch((err) => console.log(err))



    await connection.closeConnection()
}
