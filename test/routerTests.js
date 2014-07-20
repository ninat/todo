define(
    [
        "collections/TodoList",
        "router"
    ],
    function(TaskCollection, Router) {
        var collection;
        var fakeRouter;
        var opts = { trigger: true, replace: true };

        QUnit.module("Router tests", {
            setup: function() {
                collection = new TaskCollection();
                collection.create({
                    name: 'new-element',
                    state: 'new',
                    deadLine: '07.07.07',
                    description: 'new element',
                    id: "1"
                });
                collection.create({
                    name: 'done-element',
                    state: 'done',
                    deadLine: '09.09.09',
                    description: 'done element',
                    id: "2"
                });

                fakeRouter = new (Router.extend({
                  isShowIndexCalled: false,
                  showIndex: function(){
                    this.isShowIndexCalled = true;
                  },

                  isCreateTaskListingsCalled: false,
                  createTaskListings: function(){
                    this.isCreateTaskListingsCalled = true;
                  },

                  isAddTaskCalled: false,
                  addTask: function(){
                    this.isAddTaskCalled = true;
                  },

                  isEditTaskCalled: false,
                  editTask: function(){
                    this.isEditTaskCalled = true;
                  }
                }));
                Backbone.history.start();
            },

            teardown: function() {
                Backbone.history.stop();
            }
        });

        QUnit.test("after initializing collection should contain all tasks", function() {
            equal(collection.length, 2);
            equal(fakeRouter.container.selector, '#container')
        });

        QUnit.test("router should call showIndex", function() {
            fakeRouter.navigate('', opts);
            equal(fakeRouter.isShowIndexCalled, true);
        });

        QUnit.test("router should call addTask", function() {
            fakeRouter.navigate('add', opts);
            equal(fakeRouter.isAddTaskCalled, true);
        });

        QUnit.test("router should call editTask", function() {
            fakeRouter.navigate('edit/4', opts);
            equal(fakeRouter.isEditTaskCalled, true);
        });
    });
