package main

import (
	"icourse-backend/routes"
	"icourse-backend/services"
)

func main() {
	services.ConnectClient()

	routes.RegisterRoutes()
}
