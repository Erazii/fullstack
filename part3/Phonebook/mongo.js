const mongoose = require('mongoose')
mongoose.set('strictQuery', false)


console.log(process.argv.length)
if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password  = process.argv[2]
const url = `mongodb+srv://erazi:${password}@database.menksru.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3){
  Person.find({}).then((result) => {
    result.forEach((person) => console.log(person))
    mongoose.connection.close()
    process.exit()
  })
}else if(process.argv.length === 5){
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })
  person.save().then(() => {
    console.log(`added ${person.name} number ${person.number} to the phonebook`)
    mongoose.connection.close()
  })
}







/*if (process.argv.length === 3){
    Person.find({}).then((result) => {
        result.forEach((person) => console.log(person))
        mongoose.disconnect()
        process.exit(1)
    })
}
    mongoose
        .connect(url)
        .then((result) => {
            const person = new Person({
                name: process.argv[3],
                number: process.argv[4]
            })
            return person.save()
        })
        .then(() => {
            console.log(`added ${process.argv[3]} number ${process.argv[4]} to the phonebook`)
            return mongoose.disconnect()
        })
        .catch((err) => console.log(err))

*/