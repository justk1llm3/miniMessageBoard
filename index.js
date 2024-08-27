const express = require('express');
const app = express();
const PORT = 3000;

const messages = [
    {
        text: "Hi there!",
        user: "Amando",
        added: new Date()
    },
    {
        text: "Hello World!",
        user: "Charles",
        added: new Date()
    }
];
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

//set up EJS
app.set('view engine', 'ejs');

//index route
app.get('/', (req, res) => {
    res.render("index", { title: "Mini Messageboard", messages: messages })
});
//new route
app.get('/new', (req, res) => {
    res.render('new');
});
app.post('/new', (req, res) => {
    const { username, content } = req.body;
    const newMessage = {
        text: content,
        user: username,
        added: new Date()
    };
    messages.push(newMessage);
    res.redirect('/');
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
