const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', () => {
    app.use(express.static('public'));
})
app.get('*', () => {
    app.use(express.static('error'));
})
app.listen(port, () => console.log(`Bot running on http://localhost:${port}`));