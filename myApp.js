let express = require('express');
let app = express();
require('dotenv').config();
let bodyParser = require('body-parser');
let tosend = {"message": "Hello json"};
let tosendupper = {"message": "HELLO JSON"};

app.use((request,res,next)=>{
	console.log(request.method + ' ' + request.path+' - ' + request.ip);
	next();
});


app.use(bodyParser.urlencoded({extended:false}))

app.use("/public",express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});


app.get("/json",(req,res)=>{
	
	if(process.env.MESSAGE_STYLE ==='uppercase'){
		res.json(tosendupper);
	}
	else{
		res.json(tosend);
	}
	
});

app.get('/now',(req,res,next)=>{
	req.time = new Date().toString();
	next()
},(req,res)=>{
	res.json({time: req.time});
});




app.get('/:word/echo' , (req,res)=>{
	word = req.params.word
	res.json({echo: word })
})





app.get('/name',(req,res)=>{
	first = req.query.first;
	last = req.query.last;
	res.json({name : first +' '+ last})
});




app.post('/name', bodyParser.urlencoded({extended:false}) , (req,res)=>{
	first = req.body.first;
	last = req.body.last;
	res.json({name : first +' '+ last})
	
})
















 module.exports = app;
