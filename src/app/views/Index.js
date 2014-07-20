define(
['jquery', 'underscore', 'backbone', 'text!templates/Index.html'],

function($, _, Backbone, indexTemplate) {
	'use strict';

	return Backbone.View.extend({
		tmplIndex: _.template(indexTemplate),

		render: function() {
			this.$el.html(this.tmplIndex({}));
			
			return this;
		},
	});
});