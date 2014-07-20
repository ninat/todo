define(
    [
        "collections/TodoList",
        "models/TodoList",
        "views/AddTask"
    ],
    function(TaskCollection, TaskModel, AddTaskView) {
        var collection, model, view;

        QUnit.module("AddTask view tests", {
            setup: function() {
                collection = new TaskCollection();
                collection.create({
                    name: 'new-element',
                    state: 'new',
                    deadLine: '07.07.07',
                    description: 'new element',
                    id: 1
                });
                collection.create({
                    name: 'in-progress-element',
                    state: 'inProgress',
                    deadLine: '08.08.08',
                    description: 'in progress element',
                    id: 2
                }); 
                collection.create({
                    name: 'done-element',
                    state: 'done',
                    deadLine: '09.09.09',
                    description: 'done element',
                    id: 3
                });   

                model = new TaskModel();  
                view = new AddTaskView();
            },
        });

        QUnit.test("clicking button save while adding new task should save new model to the collection", function(){
          model.set({
            name: 'added-element',
            deadLine: '10.10.10',
            description: 'adding new element'
          });
          
          collection.add(model);
          
          equal(collection.length, 4);
        });   

        QUnit.test("clicking button save while edditing the task should update the model in the collection", function(){
          var model = collection.get(1);
          model.set({
            name: 'new-edditing-element',
            deadLine: '10.10.10',
            description: 'edditing the element'
          });
          
          collection.add(model);

          equal(collection.length, 3);
          equal(model.get('description'), 'edditing the element');
          equal(model.get('state'), 'new');
        }); 

        QUnit.test("validation messages should de deleted on keyup", function(){          
          $('#qunit-fixture').append('<input id="test-target" type="text" /><span id="test-msg"> error </span>');

          var e = {
            target: '#test-target'
          };
          
          view.deleteErrorMessage(e);

          equal($('#test-msg').length, 0);
        });        
    });