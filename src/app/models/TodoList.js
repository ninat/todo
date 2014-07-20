define(
['backbone', 'validation'],

function(Backbone) {
	'use strict';

	return Backbone.Model.extend({
		defaults: function() {
			var date = new Date();
			return {
				name: '',
				deadLine: date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear(),
				state: 'new',
				description: ''
			};
		},

		validation: {
		    name: {
		      required: true,
		      msg: 'Please provide task\'s name'
		    },
		    deadLine:{
		    	pattern: /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
		    	msg: 'Please provide task\'s date  in format dd/mm/yyyy'
			}
		},

		markDone: function() { 
			this.save({state: 'done'});
		},

		startTask: function() { 
			this.save({state: 'inProgress'});
		},
		
		setState: function(state) {
			this.save({state: state});
		}
	});
});