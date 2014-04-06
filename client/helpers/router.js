
Meteor.Router.add({
	'/': 'home',
	'/get_wishlist_api':'get_wishlist_api',

	'/story/profile':'newstory',
	
	'/newStory/:_id': {
		to: 'newstory2',
		and: function(id) { Session.set("currentStoryId", id); }
	},
	'/story/:_id': {
		to: 'story',
		and: function(id) { Session.set("currentStoryId", id); }
	},

	'/buy': 'buy',

	'/all': 'all',


	'/parse_email':  function() {
        post = this.request.body;
        subject = post.subject;
        text = post.text
        html = post.html
        var t = Temp.insert({'subject':subject, "text":text, "html":html});
        
        return [200, "Success"];
     },

});
