

Template.story.helpers({ 
	currentStory: function() {
		var profile = Stories.findOne(Session.get("currentStoryId")); 
		return profile;
	}
	
});

Template.paypalCreditCardForm.events({
    'submit #paypal-payment-form': function(evt, tmp){
      evt.preventDefault();
      var prices = document.getElementsByClassName('price');
      var total = 0;
      var items = Wishlist.findOne({"email":Stories.findOne(Session.get("currentStoryId")).email});
      item_id = items['_id']
      var data = items['data'];
      for (var i in prices){
      	var price = prices[i];
      	if (price.checked) {
	      	price = price.value;
	      	if(price) {
	      		total += Number(price.substring(1));
	      		data[i] = null;
	      	}
      	}
      }

      newdata = [];
      for(var j = 0; j < data.length; j++){
      	if(data[j]) {
      		newdata.push(data[j]);
      	}
      }
      console.log(newdata);
      mail = Stories.findOne(Session.get("currentStoryId")).email;
      console.log(total.toFixed(2));

      var card_data = Template.paypalCreditCardForm.card_data();

      Meteor.Paypal.purchase(card_data, {total: total.toFixed(2), currency: 'USD'}, function(err, results){
        if (err) console.error(err);
        else {
        	Wishlist.update(item_id, {"data":newdata, "email":mail});
        	console.log(results);
        }
      });
    }
  });


setTimeout(function(){
	//var items = Wishlist.findOne({"email":Stories.findOne(Session.get("currentStoryId")).email});
	//var items = Wishlist.findOne({"email":"xliang02@students.poly.edu"});
  var items = Wishlist.findOne({"email":Stories.findOne(Session.get("currentStoryId")).email});
	var html = '';
	for(var i in items['data']){
		var item = items['data'][i];
		html += "<tr><td>" + item.name + "</td>";
		html += "<td><img src='" +item.picture + "'></td>";
		html += "<td >" + item['neil-price'] + "</td>";
		html += "<td>";
		html += "<input type='checkbox' class='price' value='" + item['neil-price'] + "'/>";
		html += "</td>";
		html += "</tr>";
	}
	$("#wishlist_table").html(html);		
}, 2000);


