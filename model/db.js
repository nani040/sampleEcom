var MongoClient = require('mongodb').MongoClient

function mongoDB(url,options){
    var self = this
    MongoClient.connect(url, options, function(err, client) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);
            const db = client.db("admin");
            self.dbConnection = db;
        }
    });


    mongoDB.prototype.insert = function(collection,query,callback){
        var collection = this.dbConnection.collection(collection);
        query.timestamp = new Date();
        collection.insert(query,function(err,result){
            if(err){
                callback(err,null);
            }else{
                callback(null,result);
            }
        })
    }

    mongoDB.prototype.find = function(collectionName,query,callback){
        var collection = this.dbConnection.collection(collectionName);
        collection.find(query).toArray(function(err,result){
            if(err){
                callback(err,null);
            }else{
                callback(null,result);
            }
        });
    }

    mongoDB.prototype.aggregate = function(collection,query,callback) {
        var collection = this.dbConnection.collection(collection);
        collection.aggregate(query,function(err,result){
            if(err){
              callback(err,null);
            }else{
              callback(null, result);
            } 
        })
    }


    mongoDB.prototype.remove = function(collection,query,callback){
        var collection = this.dbConnection.collection(collection);
        collection.remove(query, function(err,result){
            if(err){
                callback(err,null);
            }else{
                callback(null,result);
            }
        });
    }

    mongoDB.prototype.findSelect = function(collectionName,query, show, callback){
        var collection = this.dbConnection.collection(collectionName);
        
            collection.find(query, show).toArray(function(err,result){
                if(err){
                    callback(err,null);
                }else{
                    callback(null,result);
                }
            });       
    }

    mongoDB.prototype.update = function(collection, query, update, callback){
        var collection = this.dbConnection.collection(collection);
        var updateQuery = {"$set" : update}
        if(update['$push'] || update['$pull'] || update['$addToSet'] || update['$unset']){
            var updateQuery = update
        }

        collection.update(query, updateQuery,{upsert:true}, function(err,result){
            if(err){
                callback(err,null);
            }else{
                callback(null, result);
            }
        });      

    }

}
module.exports.mongoDB = mongoDB;

