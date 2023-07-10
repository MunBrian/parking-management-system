package main

import (
	"github/MunBrian/parking-management-system/controllers"
	"github/MunBrian/parking-management-system/initializer"
	"github/MunBrian/parking-management-system/middlewares"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	jwtware "github.com/gofiber/jwt/v3"
)

func init() {
	initializer.LoadEnvVariables()
	initializer.ConnectionToDB()
	initializer.SyncDB()
}

func main() {

	app := fiber.New()

	app.Use(cors.New())

	app.Post("/signup", controllers.SignUp)

	app.Post("/login", controllers.Login)

	app.Patch("/update-profile", controllers.UpdateProfile)

	app.Post("/create-vehicle", controllers.CreateVehicle)

	app.Get("/get-vehicle/:id", controllers.GetVehicle)

	app.Patch("/update-vehicle", controllers.UpdateVehicle)

	app.Post("/create-parking-space", controllers.CreateParkingSpace)
	
	app.Get("/get-parking-spaces/:id", controllers.GetParkingSpace)
	app.Use(jwtware.New(jwtware.Config{SigningKey: []byte(os.Getenv("SECRET"))}))
	
	app.Get("/dashboard", middlewares.RestrictDashboard, controllers.Dashboard)
	
	//app.Post("/bookspace", middlewares.RestrictDashboard, controllers.BookParkingSpace)

	err := app.Listen(":8000")

	if err != nil {
		panic(err)
	}

}
