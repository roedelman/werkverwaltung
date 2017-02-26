Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function(){
	this.route('artwork', {
		path: '/artwork/:id',
		template: 'artwork',
		data: function(){
			templateData = {
				artworks: Artworks.find({_id:this.params.id})
			};
			return templateData;
		}
	});
	
	this.route('addArtwork', {
		path:'/addArtwork',
		template:'addArtwork'
		
	});
	this.route('queryArtwork',{
		path:'/queryArtwork',
		template:'queryArtwork'
	})

})