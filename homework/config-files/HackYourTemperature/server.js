import express from 'express'
const port='3000'

const app=express()
app.use(express.json())
app.get('/',(req,res)=>{
  res.send('hello from backend to frontend!')
})

app.post('/weather',(req,res)=>{
  const {cityName}=req.body
  res.send(`${cityName}`)
})
app.listen(port,()=>{
  console.log('listen on port:',port);
})