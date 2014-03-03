        
        // Let's begin with thinking about
        //  our form with id="addTodo". 
    
    // Wait for document.ready or window.onload 
    $(function(){
        
        // listen for sumbit on #addTodo
        $("#addTodo").on("submit", function(event){
            // Callback on form submit
            
            // canceling the event on the page
            event.preventDefault();
            //console.log("Form submitted");
            
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

            
            $.post('/todos.json', {todo: newTodo})
                .done(function(data){
                    console.log(data);
                    
                    // Now we need to append this
                    // to the page
                    var todoHTML = HandlebarsTemplates.todo(data);
                    $("#todos").append(todoHTML);
                    
                });
            
        });
        
        // We want to put all the todos on 
        // the page 
        $.get("/todos.json").done(function(data){
            $(data).each(function(index, someTodo){
                var todoHTML = HandlebarsTemplates.todo(someTodo);
                $("#todos").append(todoHTML);
            });
        });
       
       
       
       //Let's listen for updates
       // We are doing a delegate on the #todos div
       $("#todos").on("click", ".todo", function(event){
            console.log(event);
            console.log(event.target);
            if(event.target.id === "todo_completed"){
                var checkbox = event.target;
                // Because this isn't the same inside
                //  the ajax request
                var _this = this;
    
                var updated_todo = {};
                updated_todo.completed = checkbox.checked;
                updated_todo.id = this.dataset.id;
                
                // Let's write a update request
                $.ajax({
                    type: 'patch',
                    url: '/todos/'+updated_todo.id+'.json',
                    data: {todo: updated_todo}
                }).done(function(data){
                    console.log(this);
                    console.log(_this);
                    $(_this).toggleClass("done-true");
                });
            }
       // HANDLE A DELETE HERE
            if(event.target.id === "removeTodo") {
                var _this = this;
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