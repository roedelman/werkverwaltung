Template.preview.helpers({
	preview: function () {
		Console.log(this);
		return ArtworkImages.findOne();
	}
});