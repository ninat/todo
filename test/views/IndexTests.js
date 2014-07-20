define(
    [
        "views/Index"
    ],
    function(IndexView) {
        var view;

        QUnit.module("Index view tests", {
            setup: function() {
                view = new IndexView();
            },
        });

        QUnit.test("after rendering div should contain three bloks with class column nested into block with class todoList", function(){
          var template = view.render().$el;
          equal($('.todoList .column', template).length, 3);
          equal($('.todoList .column', template)[0].id, 'new');
          equal($('.todoList .column', template)[1].id, 'inProgress');
          equal($('.todoList .column', template)[2].id, 'done');
        });
});