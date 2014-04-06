
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
      itemnames = [];
      for (var i in prices){
      	var price = prices[i];
      	if (price.checked) {
	      	price = price.value;
	      	if(price) {
            itemnames.push($("#itemname" + i).html());
	      		total += Number(price.substring(1));
	      		data[i] = null;
	      	}
      	}
      }
      console.log(itemnames);
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
      totalprice3 = total.toFixed(2);
      //send twilio sms
      Meteor.Paypal.purchase(card_data, {total: total.toFixed(2), currency: 'USD'}, function(err, results){
        if (err) console.error(err);
        else {
          if (results['saved']){
            $('#myModal').modal('hide');
            $('#confirmModal').modal('show');
        	 console.log(results);
           Log.insert( {"price" : totalprice3,"id":Session.get("currentStoryId"),"itemnames":itemnames});

           Meteor.http.get('/twilio_ep',{},function(ret){console.log(ret)});
        	 Wishlist.update(item_id, {"data":newdata, "email":mail});
        	 }
        }
      });
    }
  });

Template.story.rendered = function() {
  //var items = Wishlist.findOne({"email":"xliang02@students.poly.edu"});
  var items = Wishlist.findOne({"email":Stories.findOne(Session.get("currentStoryId")).email});
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
  var items = Wishlist.findOne({"email":Stories.findOne(Session.get("currentStoryId")).email});
	var html = '';
	for(var i in items['data']){
		var item = items['data'][i];
		html += "<tr><td id='itemname" + i + "'>" + item.name + "</td>";
		html += "<td><img src='" +item.picture + "'></td>";
		html += "<td >" + item['neil-price'] + "</td>";
		html += "<td>";
		html += "<input type='checkbox' class='price' value='" + item['neil-price'] + "'/>";
		html += "</td>";
		html += "</tr>";
	}
	$("#wishlist_table").html(html);	

  var logs = Log.find({"id":Session.get("currentStoryId")}).fetch();
  var h = '';
  for(var i in logs){
    if (logs[i].price && logs[i].itemnames){
      h += '<br/>';
      h += '<div class="timeline-time">April 6, 2014</div>';
      h += '<div class="panel panel-default">';
      h += '<div class="panel-heading"><h4>Donation $' + logs[i].price + '</h4></div>';
      h += '<div class="panel-body">';
      h += '$' + logs[i].price + ' donation from user. <br/>';
      var temp = logs[i].itemnames;
      for(var j in temp){
        h += temp[j] + '<br/>';
      }
      h += '</div></div>';
    }
  }
  $("#timeline-div").append(h);
}, 2000);


