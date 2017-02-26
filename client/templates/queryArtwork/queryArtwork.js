var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};
var fields = ['type', 'description'];

ArtworkSearch = new SearchSource('artworks', fields, options);

Template.searchResult.helpers({
  artworks: function() {
    return ArtworkSearch.getData({
      transform: function(matchText, regExp) {
        return matchText.replace(regExp, '<b>$&</b>')
      },
      sort: {isoScore: -1}
    });
  },
  
  isLoading: function() {
    return ArtworkSearch.getStatus().loading;
  }
});

Template.searchResult.rendered = function() {
  ArtworkSearch.search('');
};

Template.searchBox.events({
  "keyup #search-box": _.throttle(function(e) {
    var text = $(e.target).val().trim();
    ArtworkSearch.search(text);
  }, 200)
});

Template.searchResult.events({
  'click .clickable-row': function (event) {
    Router.go('artwork',{id:this._id});
  }
});

