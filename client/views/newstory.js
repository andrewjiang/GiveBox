Template.newstory.events({
	'submit form': function(event) {
		event.preventDefault();
		var timestamp = Date.now();

		var story = {
			name: $(event.target).find('[name=name]').val(),
			email: $(event.target).find('[name=email]').val(),
			age: $(event.target).find('[name=age]').val(),
			address: $(event.target).find('[name=address]').val(),
			family: $(event.target).find('[name=family]').val(),
			timestamp: timestamp
		}

		story._id = Stories.insert(story);
		Meteor.Router.to('newstory2', story); 
	},
	'click #locker': function(event) {
		$("#storyAddress").val("370 Turk St, Located in Fort Knox Storage, San Francisco CA 94102")

	}
});

Template.newstory2.events({
	'submit form': function(e,template) {
		e.preventDefault();

	    var file = template.find('[type=file]').files[0];
	    var reader = new FileReader();
	    story = Stories.findOne(Session.get("currentStoryId"))
 				Stories.update({_id:story._id}, { $set: { 
	      	description: $("#exampleInputFile").val(),
	      }});
	    reader.onload = function(e) {
	      // Add it to your model
	
	      Stories.update({_id:story._id}, { $set: { 
					image: e.target.result //$(event.target).find('[name=image]').val()
	      }});

	      // Update an image on the page with the data
	      $(template.find('img')).attr('src', e.target.result);
	    }

	    reader.readAsDataURL(file);

		Meteor.Router.to('story', Session.get("currentStoryId")); 
	}
});
Template.newstory2.helpers({ 
	currentStory: function() {
		return Stories.findOne(Session.get("currentStoryId")); 
	}
});
Template.newstory3.helpers({ 
	currentStory: function() {
		return Stories.findOne(Session.get("currentStoryId")); 
	}
});