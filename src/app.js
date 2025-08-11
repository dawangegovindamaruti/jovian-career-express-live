const express = require('express');
const path = require('path');
const app = express();
const JOBS = require('./jobs');
const mustacheExpress = require('mustache-express');

console.log(JOBS);

app.use(express.static(path.join(__dirname , 'public')));



app.engine('mustache', mustacheExpress());
app.set('view engine','mustache');
app.set('views', path.join(__dirname,'pages'));



// app.set('views',path.join(__dirname,'public'))
app.get('/', (req, res) => {
  // res.send('hellow world !');
  //  res.sendFile(path.join(__dirname, 'pages/index.html'));
  res.render('index',{jobs:JOBS});
});

app.get('/jobs/:id',(req, res) =>{
  console.log('req.params', req.params);
  const id = req.params.id;
  const matchedJob = JOBS.find(job => job.id.toString() == id);
  res.render('job', {job : matchedJob});
})



const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on https://localhost: ${port}`);
});
