define(
['backbone', 'models/TodoList',  'localstorage'],

function(Backbone, taskModel) {
	'use strict';

	return Backbone.Collection.extend({
		model: taskModel,
		localStorage: new Backbone.LocalStorage('taskCollection'),

		findById: function(id) {
			return this.findWhere({id: id});
		},

		done: function() {
	      return this.filter(function(todo){ return todo.get('state')==='done'; });
	    },

	    inProgress: function() {
	      return this.filter(function(todo){ return todo.get('state')==='inProgress'; });
	    },

	    undone: function() {
	      return this.filter(function(todo){ return todo.get('state')==='new'; });
	    }
	});
});