const express = require('express')
const app = express()

const Poruka = require('./models/poruke')

const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.static('build'))


const zahtjevInfo = (req, res, next) => {
    console.log('Metoda:', req.method)
    console.log('Putanja:', req.path)
    console.log('Tijelo:', req.body)
    console.log('---')
    next()
  }
  
  app.use(zahtjevInfo)
  
  const errorHandler = (err, req, res, next ) => {    console.log(err.message);     
    if (err.name === 'CastError') 
    {        
        return res.status(400).send(
            {error: 'krivi format ID-a'})   
         } 
         else if (err.name === 'ValidationError'){        return res.status(400).send({error: err.message})  
        }  
            
        next(err)
    }


app.use(errorHandler)
let poruke = [
    {
        id: 4,
        sadrzaj: 'HTML nije jednostavan',
        vazno: true
    },
    {
        id: 8,
        sadrzaj: 'React koristi JSX sintaksu',
        vazno: false
    },
    {
        id: 13,
        sadrzaj: 'GET i POST su najvaznije metode HTTP protokola',
        vazno: true
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Pozdrav od Express servera + nodemona</h1>')
})

app.get('/api/poruke', (req, res) => {
    Poruka.find({}).then( rezultat =>{
        
        res.json(rezultat)
    })
})

app.get('/api/poruke/:id', (req, res, next) => {
  Poruka.findById(req.params.id)
    .then(poruka => {
      if (poruka) {
        res.json(poruka)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => next(err))
})



app.delete('/api/poruke/:id', (req, res) => {
    Poruka.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(err => next(err))
  })

  app.put('/api/poruke/:id', (req, res) => {
    const podatak = req.body
    const id = req.params.id
  
    const poruka = {
      sadrzaj: podatak.sadrzaj,
      vazno: podatak.vazno
    }
  
    Poruka.findByIdAndUpdate(id, poruka, {new: true})
    .then( novaPoruka => {
      res.json(novaPoruka)
    })
    .catch(err => next(err))
  
  })

  app.post('/api/poruke', (req, res, next) => 
  {  
      const podatak = req.body   
       const poruka = new Poruka
       ({    
           sadrzaj: podatak.sadrzaj,    
           vazno: podatak.vazno || false,   
            datum: new Date()  })   
            poruka.save()
            .then(spremljenaPoruka =>
                 {    
                     res.json(spremljenaPoruka)  
                    })  
                    .catch(err => next(err))
    })


const nepoznataRuta = (req, res) => {
    res.status(404).send({ error: 'nepostojeca ruta' })
  }
  
  app.use(nepoznataRuta)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server sluša na portu ${PORT}`);
})

/*const novaPoruka = new Poruka({
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
}) */
