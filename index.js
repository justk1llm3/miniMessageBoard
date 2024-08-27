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
    res.render('new', { title: "Add New Message", message: null });
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

app.get('/edit/:id', (req, res) => {
    const messageIndex = parseInt(req.params.id, 10);

    // Check if the index is valid
    if (isNaN(messageIndex) || messageIndex < 0 || messageIndex >= messages.length) {
        return res.status(404).send("Message not found.");
    }

    const message = messages[messageIndex];
    res.render('new', { title: "Edit Message", message: message, messageIndex: messageIndex });
});


app.post('/edit/:id', (req, res) => {
    const messageIndex = req.params.id;
    messages[messageIndex].user = req.body.username;
    messages[messageIndex].text = req.body.content;
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
