const express = require('express');
const bodyParser =  require('body-parser')
const mongoose =  require('mongoose');
const cors = require('cors');
const User = require('./model/users');
const PostDriver = require('./model/PostDriver');
const RideReq = require('./model/RideRequest');
const ContactUs = require('./model/Contactus');
const BookRides = require('./model/BookRide');

const bcrypt = require('bcrypt');
const saltRounds = 10;



const app = express();
const port = process.env.PORT ||  4000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({ origin: true }));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("we're connected!")
}
);
mongoose.connect('mongodb+srv://admin:admin@cluster0.aq9rwju.mongodb.net/', {useNewUrlParser: true});
const dbo = mongoose.connection;

app.get('/', (req, res) => {
    res.send("Hello World");
}
);
app.post('/driverpost', async (req, res) => {
    let data = await req.body;
    const newPost = new PostDriver(data);
    await newPost.save();
    res.send(newPost);
}
);
app.post('/ridereq', async (req, res) => {
    let data = await req.body;
    console.log("data",data)
    const newPost = new RideReq(data);
    await newPost.save();
    res.send(newPost);
    }
);
app.get('/posts', async (req, res) => {
        let data = await PostDriver.find();
        const userIds = data.map(item => item.userId);
        const users = await User.find({ email: { $in: userIds } });
    
        const mergedPosts = data.map(post => {
          const user = users.find(user => user.email === post.userId);
          return { ...post.toObject(), user };
        });

        console.log("merg",mergedPosts)
        res.json(mergedPosts);
        // res.send(data);
    }
);
app.get('/rideposts', async (req, res) => {
    let data = await RideReq.find();
    res.send(data);
}
);
app.post('/contact', async (req, res) => {
    let data = await req.body;
    console.log("data",data)
    const newPost = new ContactUs(data);
    await newPost.save();
    res.send(newPost);
}
);
app.put('/book/:id', async (req, res) => {
    console.log("request params===",req.params, {seats: `${req.body.seats}`});
    let result = await PostDriver.findByIdAndUpdate(req.params.id, req.body);
    console.log("result",result);
    res.send(result);
    }
);
app.post('/bookride', async (req, res) => {
    let newBookRide = new BookRides(req.body);
    await newBookRide.save();
    res.send(newBookRide);
    }
);
app.get('/getbookrides/:id', async (req, res) => {
    console.log("req params===",req.params);
       let data = await  BookRides.find({}).where("userId", req.params.id).
              exec();
              console.log("rides===",data)
    // let newBookRide = await BookRides.find({ userId: { $in: req.params.id } })
    // console.log("newBookRide",newBookRide)
    // res.send(newBookRide);
    }
);
// app.get('/users', (req, res) => {
//     User.findById(req.params.id, (err, user) => {
//         if (err) throw err;
//         res.send(user);
//     }
//     );
// }
// );
app.post('/users', (req, res) => {
    console.log("users,",req.body);
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    const user = {
        email: req.body.email,
        password: hash,
        role: req.body.role
    }
    const newUser = new User(user);
    newUser.save().then((response) => {
        console.log("user",response);
        res.send(response);
    })
});
    
    }
);
app.post('/signin', async (req, res) => {
    console.log("users signin,",req.body)
    const newUser = await User.findOne({email: req.body.email})
    bcrypt.compare(req.body.password, newUser.password, function(err, result) {
        // result == true
        console.log("result",result)
        if(result === true){
            res.send(newUser)
        }
        else {
            res.sendStatus(404)
        }
    });
    // if(!!newUser &&  === req.body.password)
    // {
    //     res.send(newUser)
    // }
    // else {
    //     res.sendStatus(404)
    // }
    }
);
app.put('/users/update/:id', async(req, res) => {
    console.log("users update,",req.body);
    await User.findByIdAndUpdate(req.params.id, req.body)
    let updatedData = await User.findById(req.params.id);
    console.log("data",updatedData)
    res.send(updatedData);
    }
);
app.get('/user/:id', async (req, res) => {
    let user = await User.findById(req.params.id);
    console.log("user===",user)
    res.send(user)
}
);
// app.post('/users/update', async (req, res) => {
//     console.log("users,",req.body);
// }
    
// );
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}
);