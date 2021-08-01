package controller

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetUpRouter() *gin.Engine {
	helloController := HelloController{}
	todoController := TodoController{}

	r := gin.Default()
	r.Use(cors.Default())
	r.GET("/healthz", healthz)

	r.GET("/hello", helloController.SayHello)
	todoGroup := r.Group("/todos")
	todoGroup.GET("/", todoController.GetTodoList)
	todoGroup.POST("/add", todoController.InsertTodo)
	return r
}

func healthz(c *gin.Context) {
	c.Writer.WriteHeader(http.StatusNoContent)
}
