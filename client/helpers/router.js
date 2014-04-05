Meteor.Router.add({
	'/': 'home',
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