define(
    ['backbone', 'collections/TodoList', 'views/TaskListing', 'views/AddTask', 'models/TodoList', 'views/Index'],

    function(Backbone, TaskCollection, TaskListingView, AddTaskView, TaskModel, IndexView) {
        'use strict';

        var that;

        return Backbone.Router.extend({
            routes: {
                '': 'showIndex',
                'add': 'addTask',
                'edit/:id': 'editTask'
            },

            initialize: function() {
                this.tasks = new TaskCollection();
                this.tasks.fetch();
                
                this.container = $('#container');

                that = this;
            },

            showIndex: function() {
                var index = new IndexView();
                this.container.html(index.render().el);

                this.createTaskListings([
                    this.createTask(index, '#new', 'Backlog', 'new'),
                    this.createTask(index, '#inProgress', 'In progress', 'inProgress'),
                    this.createTask(index, '#done', 'Complited', 'done'),
                ]);                
            },

            createTask : function(index, selector, name, state){
                return {
                    el: index.$el.find(selector),
                    name: name,
                    state: state
                };
            },

            createTaskListings: function(listings) {
                for (var i = 0; i < listings.length; i++) {
                    var taskListing = new TaskListingView({
                        el: listings[i].el,
                        collection: this.tasks,
                        name: listings[i].name,
                        state: listings[i].state
                    });
                    taskListing.render();
                }
            },

            addTask: function() {
                var newtaskView = new AddTaskView({
                    collection: this.tasks,
                    model: new TaskModel()
                });
                that.container.html(newtaskView.render().el);
            },

            editTask: function(id) {
                var foundtask = that.tasks.get(id);
                var newtaskView = new AddTaskView({
                    collection: that.tasks,
                    model: foundtask
                });
                that.container.html(newtaskView.render().el);
            }
        });
    });
