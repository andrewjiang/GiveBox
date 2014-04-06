Template.newstory.events({
	'submit form': function(event) {
		event.preventDefault();

		var story = {
			name: $(event.target).find('[name=name]').val(),
			email: $(event.target).find('[name=email]').val(),
			age: $(event.target).find('[name=age]').val(),
			family: $(event.target).find('[name=family]').val()
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

		Stories.update({_id:story._id},{$set: {
			description: $(event.target).find('[name=description]').val(),
			image: $(event.target).find('[name=image]').val()
		}});

		Meteor.Router.to('story', Session.get("currentStoryId")); 
	}
});

Template.newstory3.helpers({ 
	currentStory: function() {
		return Stories.findOne(Session.get("currentStoryId")); 
	}
});