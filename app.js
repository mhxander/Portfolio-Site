//Required frameworks for the site

const express = require('express');
const app = express();
const data = require('./data.json');

//Sets public directory to provide static assets
app.use('/static', express.static('public'));

//Set the template engine to pug
app.set('view engine', 'pug');

//Creates the home route, and renders the 'index' template
app.get('/', (req, res) => {
    res.render('index', {data});
});

//Creates the 'about' page
app.get('/about', (req, res) => {
    res.render('about');
});

//Creates each project page
app.get('/project/:id', (req, res) => {
    data.projects.forEach(project => {
        if(req.params.id === project.id) {
            res.render('project', {project})
        }
    });
});

//Middleware to run if no page found.
app.use((req, res, next) => {
    const err = new Error('The page you are trying to access does not exist!');
    err.status = 404;
    console.log(`Oops, something went wrong`);
    next(err);
});

//Renders error page with error template
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status = err.status;
    res.render('error');
});


//Communicates that the app is running on port 3000.
app.listen(3000, () => console.log('App listening on port 3000'));