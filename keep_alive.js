const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


app.use(express.static('public'));

app.use(function (req,res,next){
	res.status(404).sendFile(__dirname, '404.html');
});
app.use(function (req,res,next){
	res.status(500).sendFile(__dirname, '500.html');
});
app.listen(port, () => console.log(`Bot running on http://localhost:${port}`));