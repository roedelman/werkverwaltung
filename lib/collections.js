//Products
Artworks = new Mongo.Collection("artworks");

//Product Images
ArtworkImages = new FS.Collection("ArtworkImages", {
	stores: [new FS.Store.GridFS("ArtworkImages")]
})

ArtworkTypes = new Mongo.Collection("artworkTypes");
ArtworkSizes = new Mongo.Collection("artworkSizes");


