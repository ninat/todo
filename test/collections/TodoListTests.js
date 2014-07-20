define(
    [
        "collections/TodoList"
    ],
    function(TaskCollection) {
        var emptyCollection, collection;

        QUnit.module("TodoList collection tests", {
            setup: function() {
                emptyCollection = new TaskCollection();

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

        QUnit.test("undone should return empty array when called on empty collection", function(){
          equal(emptyCollection.undone().length, 0);
        });

        QUnit.test("undone should return an array with elements in state new", function(){
          equal(collection.undone().length, 1);
          equal(collection.undone()[0].id, 1);
          equal((collection.undone()[0]).get('state'), 'new')
        });

        QUnit.test("inProgress should return empty array when called on empty collection", function(){
          equal(emptyCollection.inProgress().length, 0);
        });

        QUnit.test("inProgress should return an array with elements in state inProgress", function(){
          equal(collection.inProgress().length, 1);
          equal(collection.inProgress()[0].id, 2);
          equal((collection.inProgress()[0]).get('state'), 'inProgress')
        });

        QUnit.test("done should return empty array when called on empty collection", function(){
          equal(emptyCollection.done().length, 0);
        });

        QUnit.test("done should return an array with elements in state done", function(){
          equal(collection.done().length, 1);
          equal(collection.done()[0].id, 3);
          equal((collection.done()[0]).get('state'), 'done')
        });

        QUnit.test("findById should return null when element is not found", function(){
          equal(emptyCollection.findById("name"), null);
        });

        QUnit.test("findById should return element with specified id", function(){
          var el = collection.findById(1);
          equal(el.get('name'), "new-element");
          equal(el.get('id'), 1);
        });        
    });