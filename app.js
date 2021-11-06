const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// Express App
const app = express();

// Connect to MogoDB
const dbURI = 'mongodb+srv://test123:test123@foodapp.qaqnm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose
  .connect(dbURI, { useNewURLParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(3000, () => {
      console.log(`App is running at 3000`);
    }),
  )
  .catch(err => console.log(err));

// Register view engine
app.set('view engine', 'ejs');

// Middleware & Static file
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//   const blog = new Blog({
//     title: 'New Blog 2',
//     snippet: 'About my new blog',
//     body: 'More about my new Blog',
//   });

//   blog
//     .save()
//     .then(result => res.send(result))
//     .catch(err => console.log(err));
// });

// app.get('/all-blogs', (req, res) => {
//   Blog.find()
//     .then(result => {
//       res.send(result);
//     })
//     .catch(err => console.log(err));
// });

// app.get('/single-blog', (req, res) => {
//   Blog.findById('6173af11a16e9940f8c0d0d0')
//     .then(result => res.send(result))
//     .catch(err => console.log(err));
// });

// const blogs = [
//   { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
//   { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
//   { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' },
// ];

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// Blog routes
app.use('/blogs', blogRoutes);

// 404 Page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
