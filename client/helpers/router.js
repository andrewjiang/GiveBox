Meteor.Router.add({
	'/': 'home',
	'/story/profile':'newstory',
	'/newStory/:_id': {
		to: 'newstory2',
		and: function(id) { Session.set("currentStoryId", id); }
	},
	'/story/:_id': {
		to: 'story',
		and: function(id) { Session.set("currentStoryId", id); }
	},
});