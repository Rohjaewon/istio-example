package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"istio.example.com/pkg/db"
	"istio.example.com/pkg/service"
)

type TodoController struct{}

var todoService = service.TodoService{}
var dbctl = db.DBController{}

func (TodoController) GetTodoList(c *gin.Context) {
	dbctl.SetClient()
	statusCode, result := todoService.GetTodoList(dbctl)
	c.JSON(statusCode, result)
}

func (TodoController) GetTodo(c *gin.Context) {
	dbctl.SetClient()
	statusCode, result := todoService.GetTodo(dbctl, c.Param("id"))
	c.JSON(statusCode, result)
}

func (TodoController) InsertTodo(c *gin.Context) {
	var newTodo db.Todo
	if err := c.ShouldBindJSON(&newTodo); err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}
	dbctl.SetClient()
	statusCode, result := todoService.InsertTodo(dbctl, newTodo)
	c.JSON(statusCode, result)
}

func (TodoController) UpdateTodo(c *gin.Context) {
	var updateTodo db.Todo
	if err := c.ShouldBindJSON(&updateTodo); err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}
	dbctl.SetClient()
	statusCode, result := todoService.UpdateTodo(dbctl, updateTodo, c.Param("id"))
	c.JSON(statusCode, result)
}
