const express=require('express')

const app=express()
const cors=require('cors')
const port=4000

app.use(cors())

let arr=[];

for(i=1;i<=30;i++)
{
    arr.push(i)
}
   
let players={
    player1:[],player2:[]
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

app.use(express.json());

app.get('/player',(req,res)=>{
    shuffle(arr)
    players.player1=arr.slice(0,5)
    players.player2=arr.slice(5,10)
    res.json({players})
})

app.get('/player/:id',(req,res)=>{
    const playerID=req.params.id
    if(players[playerID])
        {
            res.json({number:players[playerID]})
        }
        else{
            res.status(404).json({error:"Player not found"})
        }
})

app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.listen(port,()=>{
    console.log(`App is running on Port ${port}, visit http://localhost:${port}`)
})