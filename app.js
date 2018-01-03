var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var methodOverride = require("method-override");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/contacts");
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
var contactSchema = new mongoose.Schema({
    firstname : String,
    lastname : String,
    number : Number,
    city : String
});

var Contact = mongoose.model("Contact", contactSchema);
// Contact.create(
//     {
//         firstname : "Karthik",
//         lastname : "Nani",
//         number : 4437605137,
//         city : "Crofton"
//     }, function(err,contact){
//         if(err){
//             console.log(err);
//         } else{
//             console.log("newly created");
//             console.log(contact);
//         }
//     }
// )
// var contacts = [
//     {firstname:"abc", lastname:"qwe", number:4437605137, city:"Crofton", id:1},
//     {firstname:"dinesh",lastname:"namburi", number:8546584412, city:"New jersey", id:2},
//     {firstname:"Dheeraj",lastname:"Batchu", number:6549876652, city:"Atlanta", id:3 }
//     ];
//index
app.get("/", function(req,res){
    Contact.find({}, function(err, allcontacts){
        if(err){
            console.log(err);
        }else{
            res.render("contacts",{contacts:allcontacts});
        }
    });
    //res.json(contacts);
});
// new
app.get("/new", function(req, res) {
    res.render("new");
});
// create
app.post("/",function(req,res){
    //console.log(req.body);
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var number = req.body.number;
    var city = req.body.city;
    var newContact = {firstname : firstname, lastname : lastname, number : number, city : city};
    Contact.create(newContact, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect("/");
        }
    })
   // res.send("ok");
});
// show
app.get("/contact/:id", function(req,res){
    Contact.findById(req.params.id, function(err, foundContact){
        if(err){
            console.log(err);
        } else {
            res.render("show", {contact:foundContact});
        }
    });
});

// Edit
app.get("/contact/:id/edit",function(req,res){
    Contact.findById(req.params.id, function(err,foundContact){
        if(err){
            res.redirect("/");
        } else{
            res.render("edit",{contact:foundContact});
        }
    });
});
//update
app.put("/contact/:id", function(req,res){
    Contact.findByIdAndUpdate(req.params.id, req.body.contact, function(err,updatedContact){
        if(err){
            res.redirect("/");
        } else{
            res.redirect("/contact/" + req.params.id);
        }
    });
});
// delete
app.delete("/contact/:id", function(req,res){
    Contact.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/");
        } else{
            res.redirect("/");
        }
    });
});
app.get("*", function(req,res){
    res.send("Page Error");
});
app.listen(3000, function(){
    console.log("Phone Book server has Started");
});
