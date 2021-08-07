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
	r.Use(CORSMiddleware())
	r.GET("/healthz", healthz)

	r.GET("/hello", helloController.SayHello)
	todoGroup := r.Group("/todos")
	todoGroup.Use(cors.Default())
	todoGroup.GET("/", todoController.GetTodoList)
	todoGroup.POST("/add", todoController.InsertTodo)
	todoGroup.POST("/edit/:id", todoController.UpdateTodo)
	todoGroup.GET("/:id", todoController.GetTodo)

	return r
}

func healthz(c *gin.Context) {
	c.Writer.WriteHeader(http.StatusNoContent)
}
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "*")
		/*
			c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
			c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
			c.Writer.Header().Set("Access-Control-Allow-Headers", "access-control-allow-origin, access-control-allow-headers")
			c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, DELETE, OPTIONS, PATCH")
		*/

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
