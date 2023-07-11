const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { subscribe } = require('diagnostics_channel');

const app = express();
const port = 3004;

// Connect to MongoDB
mongoose.connect('mongodb+srv://mshawnlouw:Mzw%40m%40d0d%400402@cluster0.gvv0jdf.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a subscriber schema
const subscriberSchema = new mongoose.Schema({
  name: { type: String, required: true  },
  surname: { type: String, required: true },
  address: { type: String, required: true },
  tel: { type: Number, required: true },
  gender: { type: String, required: true },
  dateofbirth: { type: String, required: true },
  zipcode: { type: Number, required: true },
  course: { type: String, required: true },
  email: { type: String, required: true }


});

// Create a Subscriber model based on the schema
const Subscriber = mongoose.model('Enrollment', subscriberSchema);
// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('enroll');
  });
  
  // Handle form submission
  app.post('/enroll', (req, res) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const address = req.body.address;
    const tel = req.body.tel;
    const gender = req.body.gender;
    const dateofbirth = req.body.dateofbirth;
    const zipcode = req.body.zipcode;
    const course = req.body.course;
    const email = req.body.email;

    // Create a new Subscriber document
    const subscriber = new Subscriber({name,surname,address,tel,gender,dateofbirth,zipcode,email,course});
  
    // Save the subscriber to the database
    subscriber.save()
    .then(() => {
      console.log('New subscriber added:', name + " " + surname);
      res.send('Thank you for enrolling! Your email has been added to our Enrollment list.');
    })
    .catch((err) => {
      console.error(err);
      res.send('An error occurred while saving the Enrollment.');
    });
  
  });

    // const SubscriberSchema = {
    //     name : String,
    //     surname : String,
    //     gender : String
    // } 

    // const Enrolled = mongoose.model('Enrolled', subscriberSchema)
  
//   app.get('/enrolled', (req, res) => {
//     Enrolled.find({},  function(err, enrolled) {
//         res.render('enrolled', {
//             enrolledList : enrolled
//         })
//     })
// ;
//   });

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  