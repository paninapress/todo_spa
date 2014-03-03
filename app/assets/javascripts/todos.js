// Wait for document.ready or window.onload 
$(function () {

  // listen for sumbit on #addTodo
  $("#addTodo").on("submit", function (event) {
    // Callback on form submit

    // canceling the event on the page
    event.preventDefault();
    console.log("Form submitted");

    // create a newTodo using the
    //  todo_title out of the form
    //  and setting completed 
    //  false
    var newTodo = {
      title: $("#todo_title").val(),
      completed: false
    };

    // log the newTodo in console
    console.log(newTodo);

    // Saved         
    $.post('/todos.json', {
      todo: newTodo
    })
      .done(function (data) {
        console.log(data);
        var todoHTML = HandlebarsTemplates.todo(data);
        $("#todos").append(todoHTML);
      });

  });

  // We are doing a delegate on the #todos div
  $("#todos").on("click", ".todo", function (event) {
    console.log(event);
    console.log(event.target);
    var _this;
    if (event.target.id === "todo_completed") {
      var checkbox = event.target;
      _this = this;

      var updated_todo = {};
      updated_todo.completed = checkbox.checked;
      updated_todo.id = this.dataset.id;

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
    if (event.target.id === "removeTodo") {
      _this = this;
      var id = this.dataset.id;

      $.ajax({
        type: 'delete',
        url: '/todos/' + id
      })
        .done(function (data) {
          $(_this).remove();
        });
    }

  });
});

