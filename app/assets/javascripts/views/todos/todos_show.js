SpaApp.Views.TodosShow = Backbone.View.extend({

 className: function(){
    if (this.model.completed)
      return 'done done-true';
    else 
      return 'done';
  },

  template: HandlebarsTemplates['todos/show'],

  events: {
    'click :checkbox': 'complete',
    'click .button': 'remove'
  },

  render: function(){
    $(this.el).html(this.template(this.model));

    return this;
  },

  complete: function(event){
    event.preventDefault();
    console.log("clicked!!");

    if (event.target.id === "todo_completed") {
      var checkbox = event.target;
      _this = this.el;
      console.log(this.el);

      var updated_todo = {};
      updated_todo.completed = checkbox.checked;
      updated_todo.id = checkbox.dataset.id;
      console.log(updated_todo.completed);
      // Let's write a update request
      $.ajax({
        type: 'patch',
        url: '/todos/' + updated_todo.id + '.json',
        data: {
          todo: updated_todo
        }
      }).done(function (data) {
        $(_this).toggleClass("done-true");
      });
    } 
  },

  remove: function(event){
    event.preventDefault();

    if (event.target.id === "removeTodo") {
      _this = this.el;
      console.log(_this);
      var id = _this.dataset.id;

      $.ajax({
        type: 'delete',
        url: '/todos/' + id
      })
        .done(function (data) {
          $(_this).remove();
        });
    }

  }

});