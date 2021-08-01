package controller

import (
	"github.com/gin-gonic/gin"
	"istio.example.com/pkg/service"
)

type HelloController struct{}

var helloService = service.HelloService{}

func (HelloController) SayHello(c *gin.Context) {
	statusCode, ret := helloService.SayHello()
	c.JSON(statusCode, ret)
}
