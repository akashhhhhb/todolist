const express  =  require("express")
const bodyparser = require("body-parser")
//const date = require(__dirname + "/date.js")
const mongoose  = require("mongoose")
const _ = require("lodash")

const app = express()
app.set('view engine', 'ejs');

// var items = ["buy food","eat food"]
// let workitems = []


app.use(bodyparser.urlencoded({extended :true}))
app.use(express.static("public"))


mongoose.connect("mongodb://localhost:27017/todolistDB")

const  itemsSchema = new mongoose.Schema({
    name : String
})


const Item = mongoose.model("Item",itemsSchema)


const item1 = new Item({
    name : "Welcome to your todo list"
})

const item2 = new Item({
    name : "Hit the + button to add a new item "
})

const item3 = new Item({
    name : "<-- hit this to delete an item"
})


const defaultItems = [item1,item2,item3]

const listSchema = {
    name : String,
    items : [itemsSchema]
}

const List  = mongoose.model("List",listSchema)



// Item.insertMany(defaultItems,function(err){
//     if(err)
//         console.log(err)
//     else
//         console.log("successfully added to database")
// })




app.get("/",function(req,res){

  // var day = date.getDate()



  Item.find({},function(err,foundItems)
  {
    // console.log(foundItems)

    if(foundItems.length === 0)
        {
            Item.insertMany(defaultItems,function(err){
            if(err)
                console.log(err)
            else
                console.log("successfully added to database")
        })
            res.redirect("/")
        }
    else{   
    res.render("list",{listtitle :"Today",newlistitem:foundItems})
    }
  })



    
})

app.get("/:customlistname",function(req,res){

    const customlistname =  _.capitalize(req.params.customlistname)

    List.findOne({name : customlistname},function (err,foundList){
        if(!err)
        {
            if(!foundList)
            {
                const list = new List({
                    name : customlistname,
                    items : defaultItems
                })
                list.save()
                res.redirect("/" + customlistname)
            }
            else
            {
                res.render("list",{listtitle :foundList.name,newlistitem:foundList.items})
            }
        }
    })



   


    //res.render("list",{listtitle :"customlistname",newlistitem:foundItems})
})






app.post("/",function(req,res){

    var itemName = req.body.newitem
    var listName = req.body.list
    //console.log(req.body)
    
    // if(req.body.list === "work")
    // {
    //     workitems.push(item)
    //     res.redirect("/work")
    // }
    // else{
    //     items.push(item)
    //     res.redirect("/")
    // }

    const item = new Item({
        name : itemName
    })

    if(listName === "Today")
    {
        item.save()
        res.redirect("/")
    }
    else{
        List.findOne({name : listName},function(err,foundList){
            foundList.items.push(item)
            foundList.save()
            res.redirect("/" + listName)
        })
    }

  
})


app.post("/delete",function(req,res){
   // console.log(req.body)

   const id = req.body.checkbox
   const listName = req.body.listname

   if(listName === "Today")
   {
    Item.findByIdAndRemove(id,function(err){
        if(err)
            console.log(err)
        else
            res.redirect("/")
            //console.log("successfully deleted the data")
    })
   }
   else
   {
       List.findOneAndUpdate({name : listName},{$pull : {items : {_id: id}}},function(err,foundList){
           if(!err)
           res.redirect("/" + listName)
       })
   }


 
})



// app.post("/work",function(req,res){

//     var item = req.body.newitem
//     workitems.push(item)
//    res.redirect("/work")
// })

app.get("/about",function(req,res){
    res.render("about")
})


app.listen(3000,function(){
    console.log("server is running on port 3000")
})






