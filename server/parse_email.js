

if (Meteor.isServer) {
  Meteor.Router.add({
    '/parse_email':  function() {

        post = this.request.body;
         text = post.text
         from = post.from
        wishlistId = text.substring(text.indexOf("wishlist") + "wishlist/".length, text.indexOf("ref") - 1);
        
        mail = from.substring(from.indexOf("<") + 1, from.indexOf(">"))
        //mail="xliang02@students.poly.edu";
        //wishlistId="10O33TKEEAWL6";
        console.log("http://fromneilwithlove.herokuapp.com/wishlist.php?id=" + wishlistId);
        HTTP.get("http://fromneilwithlove.herokuapp.com/wishlist.php?id=" + wishlistId,
          {},
          function (error, result) {
            if (!error) {
            	var data = result['content'];
              console.log(data);
            	var data = JSON.parse(data);
            	var t = Wishlist.insert({"data":data, "email":mail});
            }else{
            	console.log("error");
            }
          });


        return [200, "Success"];
     }
  });
}
