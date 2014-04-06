Template.story.helpers({ 
	currentStory: function() {
		return Stories.findOne(Session.get("currentStoryId")); 
	}
});