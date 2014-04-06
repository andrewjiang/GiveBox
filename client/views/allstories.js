Template.all.helpers({ 
	stories: function() {
		var latest = Stories.find();
		return latest; 
	}
});