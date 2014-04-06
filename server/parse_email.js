
if (Meteor.isServer) {
  Meteor.Router.add({
    '/parse_email':  function() {
        post = this.request.body;
        subject = post.subject;
        text = post.text
        html = post.html
        var t = Mail.insert({'subject':subject, "text":text, "html":html});

        console.log(t);
        return [200, "Success"];
     },
  });
}
