const mongoose = require('mongoose')
const password = process.env.ATLAS_PASS
const dbname = 'poruke-api'


const url = `mongodb+srv://oarwa-lp:${password}@cluster0.0myfb.mongodb.net/${dbname}?retryWrites=true&w=majority`
console.log("Spajamo se na bazu")

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(result => {
  console.log("Spojeni smo na bazu");
}).catch(error => {
  console.log("Greška pri spajanju", error.message);
})

  const porukaSchema = new mongoose.Schema({
    sadrzaj: String,
    datum: Date,
    vazno: Boolean
  })
  
  porukaSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = doc._id.toString()
        delete ret._id
        delete ret.__v
        return ret
    }
})
module.exports = mongoose.model('Poruka', porukaSchema, 'poruke')

