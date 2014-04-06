if (Meteor.isClient) {


}

Template.story.helpers({ 
	currentStory: function() {
		var profile = Stories.findOne(Session.get("currentStoryId")); 
		return profile;
	},
	
});

Template.paypalCreditCardForm.events({
    'submit #paypal-payment-form': function(evt, tmp){
      evt.preventDefault();

      var card_data = Template.paypalCreditCardForm.card_data();

      //Probably a good idea to disable the submit button here to prevent multiple submissions.

      Meteor.Paypal.purchase(card_data, {total: '100.50', currency: 'USD'}, function(err, results){
        if (err) console.error(err);
        else console.log(results);
      });
    }
  });


setTimeout(function(){
	var items = Wishlist.findOne({"email":Stories.findOne(Session.get("currentStoryId")).email});
	var html = '';
	for(var i in items['data']){
		var item = items['data'][i];
		html += "<tr><td>" + item.name + "</td>";
		html += "<td><img src='" +item.picture + "'></td>";
		html += "<td class='price'>" +item.neil_price + "</td>";
		html += "</tr>";
	}
	$("#wishlist_table").html(html);		
}, 2000);


