define(
    ['jquery', 'underscore', 'backbone', 'text!templates/TaskListing.html', 'text!templates/Task.html'],

    function($, _, Backbone, listingTemplate, taskTemplate) {
        'use strict';

        return Backbone.View.extend({
            tmpl: _.template(listingTemplate),
            tmplTask: _.template(taskTemplate),

            initialize: function(opts) {
                this.name = opts.name;
                this.state = opts.state;

                this.collection.on('destroy', this.render, this);
                this.collection.on('sync', this.render, this);
            },

            render: function() {
                var undoneCounter = this.collection.undone().length,
                    inProgressCounter = this.collection.inProgress().length,
                    doneCounter = this.collection.done().length;

                this.$el.html(this.tmpl({
                    undone: undoneCounter,
                    inProgress: inProgressCounter,
                    done: doneCounter,
                    name: this.name,
                    state: this.state
                }));

                this.collection.each(function(model) {
                    if (this.el.id === model.toJSON().state) {
                        var content = this.tmplTask(model.toJSON());
                        $('ul', this.$el).prepend(content);
                    }
                }, this);

                return this;
            },

            events: {
                'click .btnDelete': 'deleteTask',
                'click .toggleCheckbox': 'markDone',
                'click #toggleAllCheckboxes': 'toggleAllDone',
                'click .showMoreBtn': 'toggleDescription',
                'click .moveToStartTask': 'startTask',
                'dragstart .task': 'handleDragStart',
                'dragover .tasks-list': 'handleDragOver',
                'dragenter .tasks-list': 'handleDragEnter',
                'dragenter .task': 'handleDragEnter',
                'dragleave .tasks-list': 'handleDragLeave',
                'dragleave .task': 'handleDragLeave',
                'drop .tasks-list': 'handleDrop'
            },

            deleteTask: function(e) {
                e.preventDefault();
                var id = $(e.target).data('id');
                var foundtask = this.collection.findById(id + '');
                if (foundtask) {
                    $('.confirm').click(function() {
                        foundtask.destroy();
                    });
                }

            },

            markDone: function(e) {
                var taskId = $(e.target).closest('.task').data('id');
                var model = this.collection.get(taskId);
                model.markDone();
            },

            toggleAllDone: function() {
                this.collection.each(function(todo) {
                    todo.save({
                        'state': 'done'
                    });
                });
            },

            toggleDescription: function(e) {
                e.preventDefault();
                $(e.target).closest('li').find('.description').toggle();
            },

            startTask: function(e) {
                var taskId = $(e.target).closest('.task').data('id');
                var model = this.collection.get(taskId);
                model.startTask();
            },

            handleDragOver: function(ev) {
                ev.preventDefault();
            },

            handleDragStart: function(rawEvent) {
                var e = rawEvent.originalEvent;
                var id = $(e.target).data('id');
                $(e.target).attr('opacity', '0.4');
                e.dataTransfer.setData('id', id);
            },

            handleDragEnter: function(ev) {
                if ($(ev.target).hasClass('tasks-list')) {
                    $(ev.target).addClass('over');
                } else {
                    $(ev.target).closest('.tasks-list').addClass('over');
                }
            },

            handleDragLeave: function(ev) {
                if($(ev.target).hasClass('tasks-list')) {
                    $(ev.target).removeClass('over');
                } else {
                    $(ev.target).closest('.tasks-list').removeClass('over');
                }
            },

            handleDrop: function(rawEvent) {
                rawEvent.preventDefault();
                var e = rawEvent.originalEvent;
                var id = e.dataTransfer.getData('id');
                var task = this.collection.get(id);
                task.setState(rawEvent.delegateTarget.id);
            }
        });
    });
