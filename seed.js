const connection = require('./config/mongoConnection')

const users = require('./data/users')


/* Populate the database with samples */
async function main() {
      const db = await connection.dbConnection()


    db.dropDatabase()

      const user1 = await users.createMerchant("merchant1","password","pizza king"
          ,"/public/uploads/1651791776899-651012144.jpg","1 centre Ave","all pizza you want","1234567890")
          .catch((err) => console.log(err))

       await connection.closeConnection()
}

main()