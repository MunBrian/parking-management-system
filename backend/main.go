package main

import (
	"github/MunBrian/parking-management-system/controllers"
	"github/MunBrian/parking-management-system/initializer"

	"github.com/gofiber/fiber/v2"
)

func init() {
	initializer.LoadEnvVariables()
	initializer.ConnectionToDB()
	initializer.SyncDB()
}

func main() {
	app := fiber.New()

	app.Post("/signup", controllers.SignUp)

	app.Post("/login", controllers.Login)

	app.Listen(":8000")
}
