Template.carousel.rendered = function() {
    $('.carousel').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: true
    });

}

Template.artwork.rendered = function() {
 
    Session.set('artworkId', this._id);
    $('.thumbnail-image').click(function() {
        var src = $(this).attr('src');
        $('#imagelarge_src').attr('src', src);

    });



};
Template.artwork.onRendered(function() {
   
});



Template.prices.helpers({
    artworkexhibitions: function() {
        return ArtworkExhibitions.find();ri
    }
});




Template.artwork.events({
    "click .btn-add-artWorkImage": function() {
        Session.set('artworkId', this._id);
    },

    "change #addexhibition": function(event) {
	$('.datetimepicker').datetimepicker();

	var value = event.target.value;
        if (value == "addExhibition") {
            $('#addExhibitionModal').modal('show');
        } else if (value == "removeExhibition") {
            $('#removeExhibitionModal').modal('show');

        }
    },
    "submit .addArtworkImage": function(event) {
        var file = $('#artworkImage').get(0);
        FS.Utility.eachFile(event, function(file) {
            var newFile = new FS.File(file);
            ArtworkImages.insert(newFile, function(err, result) {
                if (err) {
                    toastr.error('Fehler');
                } else {
                    var artworkImage = '/cfs/files/ArtworkImages/' + result._id;
                    Session.set('imageId', result._id);
                    var artworkId = Router.current().params.id

                    Artworks.update({
                        _id: artworkId
                    }, {
                        $push: {
                            images: {
                                image: artworkImage
                            }
                        }
                    })
                    toastr.success('Kunstwerk hinzugefügt');
                    //  Modal.show('addInfo');
                }
            });
        });

        return false;
    },

});
