if (Meteor.isServer) {
  Meteor.Router.add({
    '/get_wishlist_api': function(){
  		HTTP.get("http://www.justinscarpetti.com/projects/amazon-wish-lister/api/?199755488YXP1",
          {},
          function (error, result) {
            if (!error) {
            	var data = result['content'];
            	var data = JSON.parse(data);
            	for (var i in data) {
            			console.log( data[i]);
            			console.log("\n");
            	}
            	Meteor.publish('wishlist_data', data);
            }else{
            	console.log("error");
            }
          });
		},
  });
}


/**
{ num: 10,
I20140405-16:35:50.399(-7)?   name: 'Lakeland Mills Cedar Log Ottoman, Natural',
I20140405-16:35:50.399(-7)?   link: 'http://www.amazon.com/dp/B0012RFT06/ref=wl_it_dp_v_nS_ttl/189-9441531-9830514?_encoding=UTF8&colid=37XI10RRD17X2&coliid=I39QDQSBY00R56',
I20140405-16:35:50.400(-7)?   'old-price': 'N/A',
I20140405-16:35:50.400(-7)?   'new-price': '',
I20140405-16:35:50.400(-7)?   'date-added': 'September 3, 2012',
I20140405-16:35:50.400(-7)?   priority: '',
I20140405-16:35:50.400(-7)?   rating: 'N/A',
I20140405-16:35:50.400(-7)?   'total-ratings': '',
I20140405-16:35:50.401(-7)?   comment: '',
I20140405-16:35:50.401(-7)?   picture: 'http://ecx.images-amazon.com/images/I/416a5nzkYTL._SL135_.jpg',
I20140405-16:35:50.401(-7)?   page: 1 }
**/
