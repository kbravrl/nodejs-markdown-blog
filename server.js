const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const methodOverride = require('method-override');
const Article = require('./models/article');
const articleRouter = require('./routes/articles');

const app = express();

dotenv.config({ path : "./config/config.env"})

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch(err => console.log('Connection Error:', err));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use('/articles', articleRouter);

app.get('/', async (req,res)=> {
    const articles = await Article.find().sort({createdAt: 'desc'});
    res.render('articles/index', {articles: articles});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
});