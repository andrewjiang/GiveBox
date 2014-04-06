
Template.story.helpers({ 
	currentStory: function() {
		var profile = Stories.findOne(Session.get("currentStoryId")); 
		return profile;
	}
	
});
Template.story.events({
  'click #donateBtn' : function(e,tmp) {
      e.preventDefault
      var prices = document.getElementsByClassName('price');
      var total = 0;
      
      for (var i in prices){
        var price = prices[i];
        if (price.checked) {
          price = price.value;
          if(price) {
            total += Number(price.substring(1));
          }
        }
      }
      var sp = document.getElementById("totalprice");
      sp.innerHTML = '$' + total.toFixed(2);
     
  },

  'click #confirmModalDone' : function(e, tmp) {
      location.reload();
  },
})


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
      var sp2 = document.getElementById('totalprice2');
      sp2.innerHTML = '$' + total.toFixed(2);
      var card_data = Template.paypalCreditCardForm.card_data();

      //send twilio sms
      Meteor.Paypal.purchase(card_data, {total: total.toFixed(2), currency: 'USD'}, function(err, results){
        if (err) console.error(err);
        else {
          if (results['saved']){
            $('#myModal').modal('hide');
            $('#confirmModal').modal('show');
        	 console.log(results);
           Meteor.http.get('/twilio_ep',{},function(ret){console.log(ret)});
        	 Wishlist.update(item_id, {"data":newdata, "email":mail});
        	 }
        }
      });
    }
  });

Template.story.rendered = function() {
  //var items = Wishlist.findOne({"email":"xliang02@students.poly.edu"});
  var items = Wishlist.findOne({"email":Stories.findOne(Session.get("currentStoryId")).email}, {sort: {ts: -1}});
  console.log(items);
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
}

setTimeout(function(){
	//var items = Wishlist.findOne({"email":Stories.findOne(Session.get("currentStoryId")).email});
	//var items = Wishlist.findOne({"email":"xliang02@students.poly.edu"});
  var items = Wishlist.findOne({"email":Stories.findOne(Session.get("currentStoryId")).email}, {sort: {ts: -1}});
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


