define(
    [
        "collections/TodoList",
        "models/TodoList"
    ],
    function(TaskCollection, TaskModel) {
        var collection;

        QUnit.module("TodoList model tests", {
            setup: function() {

                collection = new TaskCollection();
                collection.create({
                    name: 'new-element',
                    state: 'new',
                    description: 'new element',
                    id: 1
                });
                collection.create({
                    name: 'in-progress-element',
                    state: 'inProgress',
                    description: 'in progress element',
                    id: 2
                }); 
                collection.create({
                    name: 'done-element',
                    state: 'done',
                    description: 'done element',
                    id: 3
                });                
            }
        });
        QUnit.test("new model should have defaults values", function(){
          var model = new TaskModel();
          var date = new Date();
          var today = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
          equal(model.get('name'), '');
          equal(model.get('deadLine'), today);
          equal(model.get('state'), 'new');
          equal(model.get('description'), '');
        });


        QUnit.test("startTask should return a model with state changed into inProgress", function(){
          var model = collection.get(1);
          equal(model.get('state'), 'new');
          model.startTask();
          equal(model.get('state'), 'inProgress');
        });

        QUnit.test("markDone should return a model with state changed into done", function(){
          var model = collection.get(2);
          equal(model.get('state'), 'inProgress');
          model.markDone();
          equal(model.get('state'), 'done');
        });

        QUnit.test("setState should return a model with saved state", function(){
          var model = collection.get(2);
          equal(model.get('state'), 'inProgress');
          model.setState('new');
          equal(model.get('state'), 'new');
        });       
    });