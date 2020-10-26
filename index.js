const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')

const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname:'hbs'
})
const PORT = process.env.PORT || 3000

app.engine('hbs', hbs.engine)

app.set('view engine', 'hbs')
app.set('views','views')

app.use(express.static(path.join(__dirname,'public')))

app.use(express.urlencoded({extended:true}))


app.use(todoRoutes)

async function start(){
    try {
        await mongoose.connect('mongodb+srv://kirill:1236987@cluster0.rrswl.mongodb.net/todos',{
            useNewUrlParser:true,
            useFindAndModify: false
        })
        app.listen(PORT, ()=>{
            console.log('Server starter...')
        })
    }catch (e){
        console.log(e)
    }
}

start()


