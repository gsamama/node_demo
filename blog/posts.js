let MongoClient = require("mongodb").MongoClient,
    ObjectID = require("mongodb").ObjectID,
    assert = require("assert");

function PostDAO(database){
  "user strict";
  this.db = database;

  this.getPosts = function(callback){
    this.db.collection("post").find().toArray(function(err, posts){
      callback(posts);
    });
  };

  this.getOnePost = function(postId, callback){
    this.db.collection("post").findOne({"_id": postId}, function(err, post){
      callback(post);
    });
  };

  this.searchPost = function(text, callback){
    this.db.collection("post").aggregate({"$match":{"$text":{ "$search": text}}}, function(err, posts){
      callback(posts);
    });
  };

  this.savePost = function(post, callback){
    this.db.collection("post").insertOne(post, function(err, result){
      callback(result);
    });
  };

  this.deletePost = function(postId, callback){
    this.db.collection("post").deleteOne(postId, function(err, result){
      callback(result);
    });
  };

  this.patchPost = function(post, callback){
    this.db.collection("post").updateOne({"_id": post["_id"]}, post, {upsert:false}, function(err, result){
      callback(result);
    });
  };

  this.updatePost = function(postId, title, body, callback){
    //not implemented yet
  };
}

module.exports.PostDAO = PostDAO;
