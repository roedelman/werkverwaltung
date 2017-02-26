  Template.carousel.rendered = function() {
  	$('.carousel').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  arrows:true
});

  }

  Template.artwork.rendered = function () {
  		Session.set('artworkId', this._id);
 
  };

  Template.artwork.events({
  	"click .btn-add-artWorkImage": function(){
  		Session.set('artworkId', this._id);
  	},
  	"submit .addArtworkImage": function (event) {
  		var file = $('#artworkImage').get(0).files[0];
  		var artworkId = Session.get('artworkId');
  		if(file){
  			fsFile = new FS.File(file);

  			ArtworkImages.insert(fsFile, function(err, result){
  				if(!err){
  					var artworkImage = '/cfs/files/ArtworkImages/'+result._id;

  					Artworks.update({
  						_id: artworkId
  					},
  					{$push:{images: {image:artworkImage}}}
  					)
  				}
  			});
  		}
  		toastr.success('Kunstwerk hinzugefügt');
		//Modal.hide('addArtworkImageModal');

		return false;
	},

});
  