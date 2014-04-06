if (Meteor.isClient) {


}

Template.story.helpers({ 
	currentStory: function() {
		var profile = Stories.findOne(Session.get("currentStoryId")); 
		return profile;
	},
	
});

setTimeout(function(){
	var items = Wishlist.findOne({"email":Stories.findOne(Session.get("currentStoryId")).email});
	var html = '';
	for(var i in items['data']){
		var item = items['data'][i];
		html += "<tr><td>" + item.name + "</td>";
		html += "<td><img src='" +item.picture + "'></td>";
		html += "</tr>";
	}
	$("#wishlist_table").html(html);		
}, 2000);


