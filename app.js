var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

var contacts = [
    {firstname:"abc", lastname:"qwe", number:4437605137, city:"Crofton", index:1},
    {firstname:"dinesh",lastname:"namburi", number:8546584412, city:"New jersey", index:2},
    {firstname:"Dheeraj",lastname:"Batchu", number:6549876652, city:"Atlanta", index:3 }
    ];
// index
app.get("/", function(req,res){
    res.render("contacts",{contacts:contacts});
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
    contacts.push(newContact);
    res.redirect("/");
   // res.send("ok");
});
// show
app.get("/contact/:index", function(req,res){
    contacts.findIndex(req.params.id, function(err, foundContact){
        if(err){
            console.log("err");
        }
        else{
            res.render("showContact",{showcontact:foundContact}); 
        }
    });
 });

app.get("*", function(req,res){
    res.send("Page Error");
});
app.listen(3000, function(){
    console.log("Phone Book server has Started");
});
