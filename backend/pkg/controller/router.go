package controller

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetUpRouter() *gin.Engine {
	helloController := HelloController{}

	r := gin.Default()
	r.Use(cors.Default())
	r.GET("/healthz", healthz)

	r.GET("/hello", helloController.SayHello)
	return r
}

func healthz(c *gin.Context) {
	c.Writer.WriteHeader(http.StatusNoContent)
}
