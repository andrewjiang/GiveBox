Template.buy.helpers({ 
	currentStory: function() {
		var profile = Stories.findOne(Session.get("currentStoryId")); 
		return profile;
	}
});