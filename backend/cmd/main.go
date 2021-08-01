package main

import (
	"fmt"
	"os"

	"istio.example.com/pkg/controller"
)

func main() {
	port, isExists := os.LookupEnv("PORT")
	if !isExists {
		port = "8080"
	}
	r := controller.SetUpRouter()
	r.Run(fmt.Sprintf(":%s", port))
}
