
if (Meteor.isServer) {
  Meteor.Router.add({
    '/parse_email':  function() {
        post = this.request.body;
        text = post.text
        from = post.from
        wishlistId = text.substring(text.indexOf("wishlist") + "wishlist/".length, text.indexOf("ref") - 1);
        mail = from.substring(from.indexOf("<") + 1, from.indexOf(">"))
        HTTP.get("http://www.justinscarpetti.com/projects/amazon-wish-lister/api/?" + wishlistId,
          {},
          function (error, result) {
            if (!error) {
            	var data = result['content'];
            	var data = JSON.parse(data);
            	var t = Wishlist.insert({"data":data, "email":mail});
            	        console.log(t);

            	//Meteor.publish('wishlist_data', data);
            }else{
            	console.log("error");
            }
          });


        return [200, "Success"];
     },
  });
}
