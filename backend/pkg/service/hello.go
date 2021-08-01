package service

import (
	"net/http"
	"os"
)

type HelloService struct{}

func (HelloService) SayHello() (int, map[string]interface{}) {
	ret := make(map[string]interface{})
	if version, isExists := os.LookupEnv("VERSION"); isExists {
		ret["msg"] = version
	}
	return http.StatusOK, ret
}
