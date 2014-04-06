Template.home.helpers({ 
	stories: function() {
		var latest = Stories.find({}, {limit: 3});
		return latest; 
	}
});