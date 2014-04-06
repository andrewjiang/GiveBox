

Template.story.helpers({ 
	currentStory: function() {
		var profile = Stories.findOne(Session.get("currentStoryId")); 
		return profile;
	},
	
});

Template.paypalCreditCardForm.events({
    'submit #paypal-payment-form': function(evt, tmp){
      evt.preventDefault();
      var prices = document.getElementsByTagName('price');
      console.log(prices);
      var total = 0;
      for (var i in prices){
      	var price = prices[i];
      	console.log(price);
      	price = price.innerHTML;
      	if(price) total += Number(price.substring(1));
      }
      console.log(total);

      var card_data = Template.paypalCreditCardForm.card_data();

      //Probably a good idea to disable the submit button here to prevent multiple submissions.

      Meteor.Paypal.purchase(card_data, {total: total, currency: 'USD'}, function(err, results){
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
		html += "<td >" + item['neil-price'] + "</td>";
		html += "<td>";
		html += "<input type='checkbox' name='price' value='" + item['neil-price'] + "'>";
		html += "</td>";
		html += "</tr>";
	}
	$("#wishlist_table").html(html);		
}, 2000);


