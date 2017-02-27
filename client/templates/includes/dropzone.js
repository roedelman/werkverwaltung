Template.dropzone.events({
	'dropped #dropzone': function(event){
		FS.Utility.eachFile(event, function(file){
			var newFile = new FS.File(file);
  			ArtworkImages.insert(newFile, function(err, result){
				if(err){
  		toastr.error('Fehler');
				}else{
  					var artworkImage = '/cfs/files/ArtworkImages/'+result._id;
					Session.set('imageId', result._id);
					 var artworkId = Router.current().params.id

					Artworks.update({
  						_id: artworkId
  					},
  					{$push:{images: {image:artworkImage}}}
  					,function(err, result){
  						if(err){
  							  		toastr.error('Fehler');
  						}else{
  							toastr.success('Kunstwerk hinzugefügt');
  						}
  					})
  		
				//	Modal.show('addInfo');
				}
			});
		});
	}
})