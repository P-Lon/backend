const mongoose = require('mongoose')
const password = process.env.ATLAS_PASS
const dbname = 'poruke-api'

const url = `mongodb+srv://oarwa-lp:${password}@cluster0.0myfb.mongodb.net/${dbname}?retryWrites=true&w=majority`

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  
  const porukaSchema = new mongoose.Schema({  
      sadrzaj: {   
         type: String,   
         minlength: 5,   
         required: true  },
      datum: {    
         type: Date,    
         required: true  }, 
         vazno: {   
         type: Boolean,    
         default: false 
         }})
  
  const Poruka = mongoose.model('Poruka', porukaSchema, 'poruke')


  const novaPoruka = new Poruka({
    sadrzaj: 'Treca poruka - Mongoose',
    datum: new Date(),
    vazno: true
  })

  Poruka.find({vazno: false})
  .then(result =>{
    result.forEach( p=>{
        console.log(p);
    })
    mongoose.connection.close()
}) 

  /*novaPoruka.save()
  .then(result => {
    console.log('Poruka spremljena')
    console.log(result);
    mongoose.connection.close()
  })*/