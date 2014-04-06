
if (Meteor.isServer) {
  Meteor.Router.add({
		'/send_email_ep': function(){
			process.env.MAIL_URL = 'smtp://neilliang:battlehack1234@smtp.sendgrid.net:587';
			Email.send({
				from: "givebox@givebox.bymail.in",
				to: "andrew.h.jiang@gmail.com",
				subject: "Givebox Donation Received!",
				text: "Hi, Someone send you a donation ",
			});
			return [200,"Success"];

		},
	});
}