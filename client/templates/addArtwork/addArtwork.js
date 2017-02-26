Template.addArtwork.helpers({
	artworktypes: function () {
		return ArtworkTypes.find();
	},
	artworksizes: function () {
		return ArtworkSizes.find();
	}
});

Template.addArtwork.events({
	"change #addArtworkSize": function(event){
		var value = event.target.value;
		if(value == "addSize"){
			$('#addArtworkSizeModal').modal('show');
		}else if(value == "removeSize"){
			$('#removeArtworkSizeModal').modal('show');

		}
	},
	"change #addartworktype": function(event){
		var value = event.target.value;
		if(value == "addType"){
			$('#addArtworkTypeModal').modal('show');
		}else if(value == "removeType"){
			$('#removeArtworkTypeModal').modal('show');

		}
	},
	"submit .addArtworkSize":function(event){
		var size = event.target.artworksize.value;
		ArtworkSizes.insert({
			name: size
		});
		toastr.success('Maße hinzugefügt');
		$('#addArtworkSizeModal').modal('hide');
		
		return false;

	},
		"submit .removeArtworkSize":function(event){
		var type = event.target.removeartworksize.value;
		ArtworkSizes.remove({
			name: type
		});
		toastr.success('Maße entfernt');
		$('#removeArtworkSizeModal').modal('hide');
		return false;

	},
	"submit .addArtworkType":function(event){
		var type = event.target.artworktype.value;
		ArtworkTypes.insert({
			name: type
		});
		toastr.success('Kategorie hinzugefügt');
		$('#addArtworkTypeModal').modal('hide');
		$('#type-picker').select('default');
		return false;

	},

"submit .removeArtworkType":function(event){
		var type = event.target.removeartworktype.value;
		ArtworkTypes.remove({
			_id: this._id
		});
		toastr.success('Kategorie entfernt');
		$('#removeArtworkTypeModal').modal('hide');
		$('#type-picker').select('default');
		return false;

	},

	"submit .addArtwork": function (event) {

		//Pflichtfelder
		var title = event.target.title.value;
		var description = event.target.description.value;
		var type = event.target.addartworktype.value;
		var size = event.target.addArtworkSize.value;

		//Käufer
		var firstname = event.target.buyer_firstname.value;
		var secondname = event.target.buyer_secondname.value;
		var street = event.target.street.value;
		var street_number = event.target.street_number.value;
		var postalcode = event.target.postalcode.value;
		var city = event.target.city.value;

		//langtext
		var description_long = event.target.description_long.value;

		var file = $('#artworkImage').get(0).files[0];

		if(file){
			fsFile = new FS.File(file);

			ArtworkImages.insert(fsFile, function(err, result){
				if(!err){
					var artworkImage = '/cfs/files/ArtworkImages/'+result._id;

					Artworks.insert({
						title: title,
						description: description,
						titleImage:artworkImage,
						size:size,
						images:[
						{image: artworkImage},
						],
						type: type,
						buyer: {
							firstname:firstname,
							secondname:secondname,
							address:{
								street: street,
								street_number: street_number,
								postalcode:postalcode,
								city:city
							}
						},
						description_long: description_long,
						createdAt: new Date()
					});
				}
			});
		}else{
			var artworkImage = '/img/noimage.png';
			Artworks.insert({
				title: title,
				description: description,
				titleImage:artworkImage,
				size: size,
				images:[
				{image: artworkImage},
				],
				type: type,

				createdAt: new Date()
			});
		}


		//clear form

		event.target.title.value = '';
		event.target.description.value = '';

		toastr.success('Kunstwerk hinzugefügt');
		//Router.go('/');

		return false;
	}
});