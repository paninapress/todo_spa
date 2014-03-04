SpaApp.Views.TodosIndex = Backbone.View.extend({
  id: 'todos',

  template: HandlebarsTemplates['todos/index'],

  events: {
    'submit #addTodo': 'add'
  },

  render: function() {
    $(this.el).html(this.template());

    var todoView;
    _.each(this.collection, function (someTodo) {
      todoView = new SpaApp.Views.TodosShow({ model: someTodo });
      this.$el.append(todoView.render().el);
    }, this);

    return this;
  },

  add: function(event) {
    event.preventDefault();
    
    var newTodo = {
      title: $("#todo_title").val(),
      completed: false
    };
    
    $.ajax({
      type: 'post',
      url: '/todos.json',
      context: this,
      data: {todo: newTodo}
    }).done(function (data) {
    var todoView = new SpaApp.Views.TodosShow({ model: data });
    this.$el.append(todoView.render().el);
  });
  }

});
