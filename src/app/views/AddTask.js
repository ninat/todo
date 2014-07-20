define(
['jquery', 'backbone', 'underscore', 'text!templates/AddTask.html', 'validation'],

function($, Backbone, _, addingTemplate) {
	'use strict';

	return Backbone.View.extend({
		tmpl: _.template(addingTemplate),
		
		events: {
			'click #btnSave': 'save',
			'keyup input[required]': 'deleteErrorMessage'
		},

		render: function() {
			var content = this.tmpl(this.model.toJSON());
			this.$el.html(content);							
			return this;
		},

		save: function(e) {
			e.preventDefault();
			var newName = $('#name', this.$el).val();
			var newDeadLine = $('#deadLine', this.$el).val();
			var newDescription = $('#description', this.$el).val();			

			if (this.model.isNew()) {
				this.model = this.collection.create();
			}
			
			this.model.set({
				name: newName,
				deadLine: newDeadLine,
				description: newDescription
			});			

			Backbone.Validation.bind(this);
			if (this.model.isValid(true)) {
				this.model.save({}, {
					success: function(){
						Backbone.history.navigate('#', { trigger: true });
					}
				});				
			}
			else
			{
				$('.error-message').remove();
				for (var key in this.model.validation) {
					var isValid = this.model.isValid(key);
					if (!isValid) {
						var errorMessage = this.model.validation[key].msg;
						var selector = $('input[id=' + key + ']');
						$('<span></span>', {
							text: errorMessage,
							class: key + ' error-message'
						}).insertAfter(selector);
						$(selector).parent().addClass('control-group error');
					}
				}
			}
		},
		
		deleteErrorMessage: function(e) {
			$(e.target).next('span').remove();
		}
	});
});