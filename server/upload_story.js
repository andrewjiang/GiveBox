
if (Meteor.isServer) {
  Meteor.Router.add({
    '/upload_story':  function() {
        post = this.request.body;
        id = post.id
        image = post.image
        console.log(id);
        console.log(image);
        description = post.description
        Stories.update({_id:post.id},{$set: {
			description:description,
			image: image,
		}});
        return [200, "Success"];
     },
  });
}
