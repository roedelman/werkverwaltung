Template.addExhibition.events({
    "submit .addExhibition": function(event) {
        var exhibition = event.target.addexhibition.value;
        var exhibitionprice = event.target.nettopreis_einzeln.value;
        var exhibitiondate = event.target.exhibitiondate.value;
        var artworkID = Router.current().params.id;
        Session.get('')
        ArtworkExhibitions.insert({
            name: exhibition,

        }, function(err, result) {
            if (err) {
                toastr.error(err.Reason);
            } else {
               // if(!Artworks.find({$and:[{_id:artworkID},{Exhibitions: {$exists: true}}]}))
                 //   Artworks.update({_id:artworkID}, {$set:{Exhibitions:[{}]}})
                Artworks.update({
                    _id: artworkID
                }, {
                    $push: {
                        Exhibitions: {
                            
                                exhibition: {
                                    name: exhibition,
                                    exhibitions_id: result._id,
                                    date: exhibitiondate,
                                    price: exhibitionprice
                                }
                            

                        }
                    }
                })
                toastr.success('Ausstellung hinzugefügt')

            }

        });
        return false;
    }
});
