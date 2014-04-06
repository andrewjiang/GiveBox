Template.newstory.events({
	'submit form': function(event) {
		event.preventDefault();

		var story = {
			name: $(event.target).find('[name=name]').val(),
			email: $(event.target).find('[name=email]').val()
		}

		story._id = Stories.insert(story);
		Meteor.Router.to('newstory2', story); 
	}
});

Template.newstory2.events({
	'submit form': function(event) {
		event.preventDefault();

		story = Stories.findOne(Session.get("currentStoryId"))

		console.log(story)

		Stories.update({_id:story._id},{$set: {description: $(event.target).find('[name=description]').val()}});

		Meteor.Router.to('newstory3', Session.get("currentStoryId")); 
	}
});

Template.newstory3.helpers({ 
	currentStory: function() {
		return Stories.findOne(Session.get("currentStoryId")); 
	}
});