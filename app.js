var express = require("express");
var app = express();

app.set("view engine","ejs");


app.get("/", function(req,res){
    var contacts = [
        {name:"abc", number:4437605137, city:"Crofton"},
        {name:" dinesh", number:8546584412, city:"new jersey"},
        {name:"Dheeraj", number:6549876652, city:"Atlanta" }
        ];
    res.render("contacts",{contacts:contacts});
});

app.get("/new", function(req, res) {
    res.render("new");
});

app.post("/",function(req,res){
    var name = req.body.name ;
    var image = req.body.number;
    var city = req.body.city;
    var newContact = {name : name, image : image, city:city};
    contacts.push(newContact);
    res.redirect("/");
});

app.get("*", function(req,res){
    res.send("Page Error");
});
app.listen(3000, function(){
    console.log("Phone Book server has Started");
});
