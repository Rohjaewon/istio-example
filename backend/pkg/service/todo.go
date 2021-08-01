package service

import (
	"log"
	"net/http"

	"istio.example.com/pkg/db"
)

type TodoService struct{}

func (TodoService) GetTodoList(dbctl db.DBController) (int, interface{}) {
	todoList, err := dbctl.GetTodoList()
	if err != nil {
		log.Println(err)
		return http.StatusBadRequest, err
	}
	return http.StatusOK, todoList
}

func (TodoService) InsertTodo(dbctl db.DBController, newTodo db.Todo) (int, interface{}) {
	err := dbctl.InsertTodo(newTodo)
	if err != nil {
		return http.StatusBadRequest, err
	}
	return http.StatusNoContent, nil
}
