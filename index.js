const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Notice = require('./models/noticeform');
const ejs = require('ejs')
// const passport = require('passport')
// const LocalStrategy = require('passport-local')
// const User = require('./models/user')



// FOR LOCAL HOSTING 
// --------------------
// mongoose.connect('mongodb://127.0.0.1:27017/igitcdc_notice', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });


// mongoose.connect(db,{
//   useNewUrlParser:true,
//   useUnifiedTopology:true,
//   }).then(()=>{
//     console.log(`Connection Sucessful`);
  
//   }).catch((err) => console.log("No Connections"));




mongoose.connect("mongodb+srv://lingarajs2002:FYRvqlUhgpn0oPr2@cdc-notice.xxgcady.mongodb.net/?retryWrites=true&w=majority",{
useNewUrlParser: true,
useUnifiedTopology: true,
})


const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Database connected');
});


mongoose.connect("mongodb+srv://lingarajs2002:FYRvqlUhgpn0oPr2@cdc-notice.xxgcady.mongodb.net/?retryWrites=true&w=majority",{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  }).then(()=>{
    console.log(`Connection Sucessful`);
  
  }).catch((err) => console.log("No Connections"));


const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('public', path.join(__dirname, '/public'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))
app.get('/', (req, res) => {
  res.render('main');
});
app.get('/newNotice', (req, res) => {
  res.render('home');
});
app.get('/notices', async (req, res) => {
  const notices = await Notice.find({});
  res.render('noticefolder/index', { notices });
});

app.get('/notices/new', (req, res) => {
  res.render('noticefolder/new');
});


app.post('/notices', async (req, res) => {
  const notice = new Notice(req.body.notice);
  console.log(notice)
  await notice.save();
  res.redirect(`/notices/${notice._id}`);
});

app.post('/othernotice', async (req, res) => {
  const notice = new Notice(req.body.notice);
  console.log(notice)
  await notice.save();
  res.redirect(`/othernotice/${notice._id}`);
});

app.get('/othernotice/:id', async (req, res) => {
  const notice = await Notice.findById(req.params.id); // Use 'params' instead of 'body'
  res.render('noticefolder/show1', { notice });
});

app.get('/notices/:id', async (req, res) => {
  const notice = await Notice.findById(req.params.id); // Use 'params' instead of 'body'
  res.render('noticefolder/show1', { notice });
});

app.get('/notices/:id/edit',async(req,res)=>{
  const notice = await Notice.findById(req.params.id); 
  res.render('noticefolder/edit', { notice });
  console.log(notice)
})

app.get('/notices/:id/edit1',async(req,res)=>{
  const notice = await Notice.findById(req.params.id); 
  res.render('noticefolder/edit1', { notice });
  console.log(notice)
})


app.post('/notices/:id/newpdf',async(req,res)=>{
  res.send("hello")
})
// For Updating the form
app.put('/notices/:id',async(req,res)=>{
  const {id} = req.params
  const notice = await Notice.findByIdAndUpdate(id,{...req.body.notice})
  res.redirect(`/notices/${notice._id}`);
})

app.put('/othernotice/:id',async(req,res)=>{
  const {id} = req.params
  const notice = await Notice.findByIdAndUpdate(id,{...req.body.notice})
  res.redirect(`/othernotice/${notice._id}`);
})


app.listen(3000, () => {
  console.log('Serving on port 3000');
});
