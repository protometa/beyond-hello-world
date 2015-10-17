
Messages = new Mongo.Collection("messages")


if (Meteor.isClient) {

	Template.chatbox.events({
		"submit #chatform": function (event, template) {
			event.preventDefault()
			var text = template.$("#chatinput").val()
			
			Messages.insert({text: text, time: new Date(), user: Meteor.user().emails[0].address.split('@')[0]})

			template.$("#chatinput").val('')
		}
	})

	Template.messages.helpers({
		messages: function () {
			return Messages.find({}, {sort: {time: -1}})
		}
	})

	Template.message.helpers({
		useroranon: function  () {
			return this.user || "anon"
		}
	})

};