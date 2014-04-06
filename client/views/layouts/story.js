Template.story.helpers({ 
	currentStory: function() {
		var profile = Stories.findOne(Session.get("currentStoryId")); 
		return profile;
	},

	wishlist: function() {
		var email = Wishlist.findOne(Session.get("currentStoryId")).email;
		var items = Wishlist.findOne({"email":email}).data;
		return items;
	},
});