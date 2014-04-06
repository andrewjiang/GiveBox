
Meteor.Router.add({
	'/': 'home',
	'/get_wishlist_api':'get_wishlist_api',

	'/story/profile':'newstory',
	
	'/newStory/:_id': {
		to: 'newstory2',
		and: function(id) { Session.set("currentStoryId", id); }
	},
	'/newWishlist/:_id': {
		to: 'newstory3',
		and: function(id) { Session.set("currentStoryId", id); }
	},

	'/parse_email':  function() {
        post = this.request.body;
        color = post.subject;
        console.log(color)
        //Colors.update({pos: 1},{ $set: { "name": color } } );

        return [200, "Success"];
     },
});
