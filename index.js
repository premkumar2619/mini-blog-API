const express = require("express");
const app = express();
const path = require("path");
const {v4:uuidv4}=require('uuid');
const methodOverride = require("method-override");
const port = 8080;

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));

let posts = [
    {
        id: uuidv4(),
        username: "Prem",
        content: "I Love Coding"
    },
    {
        id: uuidv4(),
        username: "Prince",
        content: "Hard working"
    }
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req, res)=>{
    res.render("new.ejs");
});

app.post("/data",(req, res)=>{
    let {username, content}= req.body;
    let id = uuidv4();
    posts.push({id, username,content});
    res.redirect("/posts");
});

app.get("/posts/:id", (req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id ===p.id);
    res.render("show.ejs",{post});
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id===p.id);
    res.render("edit.ejs", {post});
});
app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=> id ===p.id);
    post.content = newContent;
    res.redirect("/posts");
});

app.delete("/posts/:id/delete",(req,res)=>{
    let {id}= req.params;
    posts = posts.filter((p)=> id !==p.id);
    res.redirect("/posts");
});

app.listen(port, ()=>{
    console.log("Port is listening on 8080");
});