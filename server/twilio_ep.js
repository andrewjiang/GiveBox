 
if (Meteor.isServer) {
	Meteor.Router.add({
    '/twilio_ep': function(){
	 	
		twilio = Twilio('AC6f496c11704357c01bce024c38d8be96', '81e87fa1f013dd82358c84372b483909');
		  twilio.sendSms({
		    to:'19176794570', // Any number Twilio can deliver to
		    from: '+19175254518', // A number you bought from Twilio and can use for outbound communication
		    body: 'Somebody has donate money to you.' // body of the SMS message
		  }, function(err, responseData) { //this function is executed when a response is received from Twilio
		    if (!err) { // "err" is an error received during the request, if any
		      // "responseData" is a JavaScript object containing data received from Twilio.
		      // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
		      // http://www.twilio.com/docs/api/rest/sending-sms#example-1
		      console.log(responseData.from); // outputs "+14506667788"
		      console.log(responseData.body); // outputs "word to your mother."
		    }else{
		    	console.log(err);
		    }
		});
		return [200,"Success"];

   },
  });
}

/*
curl -XPOST https://api.twilio.com/2010-04-01/Accounts/AC6f496c11704357c01bce024c38d8be96/SMS/Messages.json \
    -d "Body=All%20in%20the%20game%2C%20yo" \
    -d "To=%2B14108675309" \
    -d "From=%2B15005550006" \
    -u 'AC6f496c11704357c01bce024c38d8be96:{AuthToken}'

    */