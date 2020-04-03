const express=require('express')
const app=express()
const path=require('path')
const hbs=require('hbs')
const forcast=require('./utils/forcast')
const geocode=require('./utils/geocode')
const port=process.env.port || 3000

//paths for express too config
const publicpath=path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')

//setup handle bars and views path
app.set('views',viewpath)
app.set('view engine','hbs')
hbs.registerPartials(partialspath)

//static pages to serve
app.use(express.static(publicpath))
app.get('',(req,res)=>{
 
  res.render('index',{
    name:'weather' ,
    title:'Weather',
    end:'created by guru'
  })
})

app.get('/about',(req,res)=>{
 
  res.render('about',{
    name:'bill' ,
    title:'About me',
    end:'created by guru'

  })
})
app.get('/help',(req,res)=>{
 
  res.render('help',{
    pstring:'rendering help',
    title: '',
    end:'created by guru'
  })
})

app.get('',(req,res)=>{
  res.send('its espress')

})


app.get('/weather',(req,res)=>{
  if(!req.query.address){
    return res.send({
      error:'enter some location'
    })
  }
  geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
    if(error){
      return res.send({error})
    }
    forcast(latitude,longitude,(error,fdata)=>{
      if(error){
        return res.send({error})
      }
      res.send({
        forcast:fdata,
        location,
        address:req.query.address
      })
    })
  })

  
})

app.get('/help/*',(req,res)=>{
  res.render('404',{
    title:'404',
    end:'created by guru',
    errormsg:' help page not found'
  })
})


app.get('/products',(req,res)=>{
  if(!req.query.search){
    return res.send({
      error:'enter some query'
    })
  }
  console.log(req.query.search)
  res.send({
    products:[]
  })
})
app.get('*',(req,res)=>{
  res.render('404',{
    title:'404',
    end:'created by guru',
    errormsg:'page not found'
  })
})

app.listen(port,()=>{
  console.log('server is up on'+port)
})