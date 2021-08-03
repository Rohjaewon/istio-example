package service

import (
	"net/http"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"istio.example.com/pkg/db"
)

type TodoService struct{}

func (TodoService) GetTodoList(dbctl db.DBController) (int, interface{}) {
	todoList, err := dbctl.GetTodoList()
	if err != nil {
		return http.StatusBadRequest, err
	}
	return http.StatusOK, todoList
}

func (TodoService) GetTodo(dbctl db.DBController, id string) (int, interface{}) {
	todo, err := dbctl.GetTodo(id)
	if err != nil {
		return http.StatusBadRequest, err
	}
	return http.StatusOK, todo
}

func (TodoService) InsertTodo(dbctl db.DBController, newTodo db.Todo) (int, interface{}) {
	err := dbctl.InsertTodo(newTodo)
	if err != nil {
		return http.StatusBadRequest, err
	}
	return http.StatusNoContent, nil
}

func (TodoService) UpdateTodo(dbctl db.DBController, updateTodo db.Todo, id string) (int, interface{}) {
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return http.StatusBadRequest, err
	}
	updateTodo.ID = objID
	err = dbctl.UpdateTodo(updateTodo)
	if err != nil {
		return http.StatusBadRequest, err.Error()
	}
	return http.StatusOK, nil
}
