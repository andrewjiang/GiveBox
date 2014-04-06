
if (Meteor.isServer) {
  Meteor.Router.add({
    

		'/send_email_ep': function(){
			process.env.MAIL_URL = 'smtp://neilliang:battlehack1234@smtp.sendgrid.net:587';
			Email.send({
				from: "xl712@nyu.edu",
				to: "neilliang1988@gmail.com",
				subject: "Thanks",
				text: "Here is some text",
			});
			return [200,"Success"];

		},
	});
}