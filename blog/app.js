let express = require('express'),
    app = express(),
    PostDAO = require("./posts").PostDAO,
    MongoClient = require("mongodb").MongoClient,
    ObjectID = require("mongodb").ObjectID,
    assert = require("assert");

MongoClient.connect("mongodb://localhost:27017/blog", function(err, db){
  "use strict";
  assert.equal(null, err);
  console.log("Successfully connected to MongoDB.");

  let posts = new PostDAO(db);
  let router = express.Router();

  router.get("/list", function(req, res){
    "use strict";
    posts.getPosts(function(posts){
      res.status(200).json(posts);
    });
  });

  router.get("/get/:id", function(req, res){
    "use strict";
    let id = new ObjectID(req.query.id);
    posts.getOnePost(id, function(post){
      res.status(200).json(post);
    });
  });

  router.get("/search/", function(req, res){

  });

  router.post("/insert", function(req, res){

  });

  router.delete("/delete", function(req, res){

  });

  router.patch("/patch", function(req, res){

  });

  router.put("/update", function(req, res){
    //not implemented yet
  });

  app.use("/", router);
  let server = app.listen(3000, function(){
    let port = server.address().port;
    console.log('Blog server listening on port %s.', port);
  });
});
