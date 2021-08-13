const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


app.use(express.static('public'));

app.get('*', () => {
    res.sendFile(__dirname + "/404.html")
})
app.listen(port, () => console.log(`Bot running on http://localhost:${port}`));