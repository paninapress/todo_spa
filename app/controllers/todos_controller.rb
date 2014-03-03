class TodosController < ApplicationController
  def index
    @todos = Todo.all
    respond_to do |f|
      f.html
      f.json { render :json => @todos, only: [:id, :title, :completed]}
    end
  end

  def create
    todo_params = params.require(:todo).permit(:title, :completed)
    @todo = Todo.create(todo_params)

    respond_to do |f|
      f.json { render :json => @todo, only: [:id, :title, :completed] }
    end
  end

  def destroy
    todo = Todo.find(params[:id])
    todo.destroy

    respond_to do |f|
      f.json { render json: {}, only: [:id, :title, :completed]}
    end
  end

  def update
    updated_params = params.require(:todo).permit(:title, :completed)
    
    todo = Todo.find(params[:id])
    todo.update_attributes(updated_params)

    respond_to do |f|
      f.json { render json: todo, only: [:id, :title, :completed]}
    end
  end
end
