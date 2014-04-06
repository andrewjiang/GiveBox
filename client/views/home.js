Template.home.helpers({ 
	stories: function() {
		var latest = Stories.find({}, {sort: {timestamp: -1}, limit: 3});
		return latest; 
	}
});