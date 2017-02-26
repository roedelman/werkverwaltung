
if(Meteor.isServer) {
Artworks._ensureIndex({type: 1, description: 1});
}