const express = require("express");
const bodyParser = require("body-parser");
const day = require(__dirname + "/modules/date.js"); //my module created by Node docs
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// mongoose.connect('mongodb://127.0.0.1:27017/toDoListDB');  //This is for local connection
mongoose.connect('mongodb+srv://basher207:todolistv2@cluster0.z2chvla.mongodb.net/toDoListDB'); //This working with already created MongoDB Atlass project

const itemSchema = new mongoose.Schema({
    task: {type: String, required: true}
})

const Item = mongoose.model("Item", itemSchema);


//DEFAULT LIST
app.get("/", function(req, res){

    async function getItems(){
        const items = await Item.find({}); // geting all items from "Item" collection

        res.render("list", {
            listTitle: day, // "day" is the information from modules/date.js
            tasks: items,
            buttonActionType: "/"
        });
    };
    
    getItems();
});

app.post("/", function(req, res){
    const newItemName = req.body.elementToAdd;

    async function getItemsNumber(itemName){
        const items = await Item.find({}); // geting all items from "Item" collection

        if(items.length >= 0 && items.length <= 4){
            
            if(itemName.length > 0 && itemName.length <= 15){  // Checking for empty or big string

                // Adding new element to "Task" collection 
                const task = new Item({task: itemName});
                task.save(); 

                res.redirect("/");
            }else{
                res.render("stringErr");
            }

        }else{
            res.render("tooMuchItemsErr");
        }
    }

    getItemsNumber(newItemName);
});


app.post("/delete", function(req, res){

    const elementsDel = req.body.elemetsToDelete;
    const arrayToDel = elementsDel.split(",");
    

    async function deleteTasks(ids){
        await Item.deleteMany({_id:{$in:ids}});
        res.redirect("/");
    }

    //Check if any element selected to delete. If none selected, page reloads
    if(elementsDel.length > 0){
        deleteTasks(arrayToDel);
    }else{
        res.redirect("/");
    }
    
});

//SERVER LISTENING
const PORT = 3000;
app.listen(PORT, function(){
    console.log("Server has started on port " + PORT + "...");
});

