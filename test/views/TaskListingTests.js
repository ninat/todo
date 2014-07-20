define(
    [
        "collections/TodoList",
        "views/TaskListing"
    ],
    function(TaskCollection, TaskListingView) {
        var collection, view;

        function createEvent(target){
          var e = {
            target: target,
            isPreventDefaultCalled: false,
            dataTransfer : {
              obj: {
                id: 1
              },
              setData:  function(data, val) {
                this.obj[data] = val;
              },
              getData:  function(data) {
                return this.obj[data];
              }
            },
            preventDefault: function() {
              this.isPreventDefaultCalled = true;
            }
          };  

          return e;
        }

        QUnit.module("TaskListing view tests", {
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
                    name: 'in-progress-element',
                    state: 'inProgress',
                    deadLine: '08.08.08',
                    description: 'in progress element',
                    id: "2"
                }); 
                collection.create({
                    name: 'done-element',
                    state: 'done',
                    deadLine: '09.09.09',
                    description: 'done element',
                    id: "3"
                });   

                view = new TaskListingView({name: 'name', collection: collection});                
            },
        });

        QUnit.test("after rendering ul should contain list item with class task", function(){
          var template = view.render().$el;
          equal($('#toggleAllCheckboxes', template).length, 1);
          equal($('.tasks-list', template).length, 1);
          equal($('.column-footer', template).length, 1);
        });

        QUnit.test("clicking delete button should destroy task", function(){
          $('#qunit-fixture').append('<a id="test-target" href="#" data-id="1" /><a href="#" class="confirm"></a>');                  
          var e = createEvent('#test-target');

          var dt = view.deleteTask(e);
          $('#qunit-fixture .confirm').trigger('click');

          equal(collection.get('1'), undefined);
        }); 

        QUnit.test("clicking checkbox should change state into Done in selected task", function(){
          $('#qunit-fixture').append('<li class="task" data-id="1"><input type="checkbox" id="test-target" /></li>');
          var e = createEvent('#test-target');

          view.markDone(e);

          equal((collection.get('1')).get('state'), 'done');
        }); 

        QUnit.test("clicking button Check all tasks should change state into Done in every model from that column", function(){
          $('#qunit-fixture').append('<div class="column" id="inProgress"><input type="checkbox" id="test-target" /></div>');

          var e = createEvent('#test-target');

          view.toggleAllDone(e);
          equal((collection.get('2')).get('state'), 'done');
        }); 

        QUnit.test("clicking button Details should toggle model's description", function(){
          $('#qunit-fixture').append('<li class="task" data-id="1"><a href="#" id="test-target"> </a><p class="description">description</p></li>');
          var e = createEvent('#test-target');

          equal($('.description').is(":visible"), true);
          view.toggleDescription(e);
          equal($('.description').is(":visible"), false);
        }); 

        QUnit.test("clicking button Start should change state into inProgress in selected model", function(){
          $('#qunit-fixture').append('<li class="task" data-id="1"><a href="#" id="test-target"></a></li>');
          var e = createEvent('#test-target');

          view.startTask(e);

          equal((collection.get('1')).get('state'), 'inProgress');
        });    

        QUnit.test("handleDragStart should set id to dataTransfer", function(){
          $('#qunit-fixture').append('<li class="task" data-id="1"><a href="#" id="test-target" data-id="1"></a></li>');
          var rawEvent = {
            originalEvent : createEvent('#test-target')
          };
          
          view.handleDragStart(rawEvent);

          equal(rawEvent.originalEvent.dataTransfer.obj.id, 1);
        });

        QUnit.test("handleDragOver should call preventDefault", function() {
          var e = createEvent('#test-target');

          view.handleDragOver(e);

          equal(e.isPreventDefaultCalled, true);
        });

        QUnit.test("handleDragEnter should add class over", function() {
          $('#qunit-fixture').append('<ul class="tasks-list" id="test-target2"><li class="task" id="test-target1"></li></ul>');
          var e1 = createEvent('#test-target1');
          var e2 = createEvent('#test-target2');

          view.handleDragEnter(e1);
          view.handleDragEnter(e2);

          equal($(e1.target).closest('.tasks-list').hasClass('over'), true);
          equal($(e2.target).hasClass('over'), true);
        });

        QUnit.test("handleDragLeave should delete class over", function() {
          $('#qunit-fixture').append('<ul class="tasks-list" id="test-target2"><li class="task" id="test-target1"></li></ul>');
          var e1 = createEvent('#test-target1');
          var e2 = createEvent('#test-target2');

          view.handleDragLeave(e1);
          view.handleDragLeave(e2);

          equal($(e1.target).closest('.tasks-list').hasClass('over'), false);
          equal($(e2.target).hasClass('over'), false);
        });

        QUnit.test("handleDrop should change model's state", function(){
          $('#qunit-fixture').append('<li class="task" data-id="1"><a href="#" id="test-target" data-id="1"></a></li>');
          var rawEvent = {
            originalEvent : createEvent('#test-target'),
            delegateTarget : {
              id: 'inProgress'
            },
            preventDefault: function () {
              return false;
            }
          };
          
          view.handleDrop(rawEvent);

          equal((collection.get('1')).get('state'), 'inProgress');
        });
    });