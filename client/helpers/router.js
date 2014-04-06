
Meteor.Router.add({
	'/': 'home',
	'/get_wishlist_api' : '../get_wishlist_api/get_wishlist_api',
	'/story/profile':'newstory',
	'/newStory/:_id': {
		to: 'newstory2',
		and: function(id) { Session.set("currentStoryId", id); }
	},
	'/newWishlist/:_id': {
		to: 'newstory3',
		and: function(id) { Session.set("currentStoryId", id); }
	},
});
