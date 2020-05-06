const express = require('express');
const app = express();
const data = require('./data.json');

app.use('/static', express/static('public'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index', {data});
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/project/:id', (req, res) => {
    data.projects.forEach(project => {
        if(req.params.id === project.id) {
            res.render('project', {project})
        }
    });
});

app.use((req, res, next) => {
    const err = new Error('The page you are trying to access does not exist!');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status = (err.status);
    console.log(err);
    res.render('error');
});



app.listen(3000, () => console.log('App listening on port 3000'));