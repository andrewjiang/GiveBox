Template.all.helpers({ 
	stories: function() {
		var latest = Stories.find({}, {sort: {timestamp: -1}});
		return latest; 
	}
});