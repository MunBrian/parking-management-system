package main

import (
	"github/MunBrian/parking-management-system/controllers"
	"github/MunBrian/parking-management-system/initializer"
	"github/MunBrian/parking-management-system/middlewares"
	"os"

	"github.com/gofiber/fiber/v2"
	jwtware "github.com/gofiber/jwt/v3"
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

	app.Use(jwtware.New(jwtware.Config{SigningKey: []byte(os.Getenv("SECRET"))}))

	app.Get("/dashboard", middlewares.RestrictDashboard, controllers.Dashboard)

	err := app.Listen(":8000")

	if err != nil {
		panic(err)
	}

}
