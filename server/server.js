const express = require('express');
const app = express();
const path = require('path');
//var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true })
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myTestDBE');
var db = mongoose.connection;
db.on('error', function (err) {
    console.log('connection error', err);
});
db.once('open', function () {
    console.log('connected.');
});
var Schema = mongoose.Schema;
var userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    password_again: { type: String, required: true }
});
var productSchema = new Schema({
    Product_Name: { type: String, required: true },
    Product_Owner: { type: String, required: true },
    Product_URL: { type: String, required: true },
    Product_Owner_ID: { type: String }
});
var User = mongoose.model('User', userSchema);
var product = mongoose.model('product', productSchema);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '/../client/public/script')));
app.use(express.static(path.join(__dirname, '/../client/public/css')));

app.get('/Register', function (req, res) {
    res.sendFile(path.join(`${__dirname}/../client/Register.html`));
});
app.get('/Login', function (req, res) {
    res.sendFile(path.join(`${__dirname}/../client/Login.html`));
});
app.get('/insert', function (req, res) {
    res.sendFile(path.join(`${__dirname}/../client/insert.html`));
});
app.get('/edit', function (req, res) {
    res.sendFile(path.join(`${__dirname}/../client/edit.html`));
});
app.get('/forgot-password', function (req, res) {
    res.sendFile(path.join(`${__dirname}/../client/forgot-password.html`));
});
app.get('/Home_page', function (req, res) {
    res.sendFile(path.join(`${__dirname}/../client/home_page.html`));

});
app.get('/Home/:Product_Owner_ID', function (req, res) {
    console.log(req.params);

    product.find({ Product_Owner_ID: req.params.Product_Owner_ID }).then(function (err, product) {
        if (err) {
            return res.send(err);
        }
        return res.json(product);
    })
});
app.post('/userRegister', function (req, res) {

    console.log(req.body);

    var email_obj = User.findOne({
        email: req.body.email
    })
    //  console.log(email_obj);
    email_obj.exec(function (err, data) {

        if (err) {
            // console.log("error...", err);

            return res.status(301).send('query error');
        }
        if (data) {
            // console.log("data......", data);

            return res.status(300).send('email already exist...');
        }
        var User_Store = new User({
            username: req.body.name,
            email: req.body.email,
            password: req.body.password,
            password_again: req.body.cpassword
        });
        //  console.log(User_Store);
        User_Store.save(function (err, data) {


            // if (err) {
            //     return res.status(301).send('fill all required fields');
            // }
            if (data) {
                console.log('Saved ', data);
                let data1 = { id: data._id, username: data.username };
                return res.status(200).send(data1);
            }
            else {
                return res.status(401).send('registerd failed');
            }
        });
    });
});
app.post('/userLogin', function (req, res) {
    console.log(req.body);
    var email_obj = User.findOne({
        email: req.body.email
    })

    email_obj.exec(function (err, data) {
        console.log(data);
        if (err) {
            return res.status(301).send('query error');
        }
        if (!data) {
            return res.status(301).send('email not exist');
        }
        if (req.body.password == data.password) {
            var doc1 = { id: data._id, username: data.username };
            return res.status(200).send(doc1);
        }
        else {
            return res.status(301).send('Password  incorrect');
        }
    });
});
app.post('/ProductDetails', function (req, res) {
    var add_user = new product({
        Product_Name: req.body.Product_Name,
        Product_Owner: req.body.Product_Owner,
        Product_URL: req.body.Product_URL,
        Product_Owner_ID: req.body.Product_Owner_ID
    });
    add_user.save(function (err, data) {
        if (err) {
            return res.status(301).send('fill all field');
        }
        if (data) {
            console.log('Saved ', data);
            return res.status(200).send(data);
        }
        else {
            return res.status(401).send(' Failed to save');
        }
    });
});
app.post('/deleteProduct', function (req, res) {
    console.log(req.body.id);
    product.remove({ _id: req.body.id }).then(function (err, data) {
        if (err) {
            return res.send(err);
        }
        console.log(data);
        return res.json(data);
    })
});
app.post('/updateProduct', function (req, res) {
    console.log(req.body);
    product.update({ _id: req.body.id }, { $set: { id: req.body.id, Product_Name: req.body.Product_Name, Product_URL: req.body.Product_URL } }).then(function (err, data) {
        if (err) {
            return res.send(err);
        }
        console.log(data);
        return res.json(data);
    })
});
app.post('/editProduct', function (req, res) {
    console.log(req.body.id);
    product.findOne({ _id: req.body.id }).then(function (err, data) {
        if (err) {
            return res.send(err);
        }
        console.log(data);
        return res.json(data);
    })
});
app.listen(3000, function () {
    console.log("Listening on port 3000!")
})