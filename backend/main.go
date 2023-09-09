package main

import (
	"fmt"
	"github/MunBrian/parking-management-system/controllers"
	"github/MunBrian/parking-management-system/initializer"
	"github/MunBrian/parking-management-system/middlewares"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	jwtware "github.com/gofiber/jwt/v3"
)

func init() {
	//initializer.LoadEnvVariables()
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

	app.Get("/get-all-parking", controllers.GetAllParkingSpaces)

	app.Post("/create-parking-space", controllers.CreateParkingSpace)
	
	app.Get("/get-parking-spaces/:id", controllers.GetOwnerParkingSpace)

	app.Get("/get-parking/:id", controllers.GetParkingSpace)
	
	app.Delete("/delete-parking/:id", controllers.DeleteParkingSpace)

	
	app.Get("/get-motorist-bookings/:id", controllers.GetMotoristBookingData)
	
	app.Get("/get-booking/:id", controllers.GetBookingData)
	
	app.Post("/process-payment", controllers.ProcessPayment)
	
	app.Post("/book-parking-space", controllers.BookParkingSpace)

	app.Get("/get-owner-bookings/:id", controllers.GetOwnerBookingData)

	app.Get("/get-all-bookings", controllers.GetAllBookings)

	app.Post("/forgot-password", controllers.ForgotPassword)

	app.Post("/send-stkpush", controllers.SendSTKPUSH)	

	app.Use(jwtware.New(jwtware.Config{SigningKey: []byte(os.Getenv("SECRET"))}))
	
	app.Get("/dashboard", middlewares.ValidateToken, controllers.Dashboard)

	app.Post("/reset-password", middlewares.ValidateToken, controllers.ResetPassword)
	

	port := os.Getenv("PORT")

	if port == ""{
		port = "8000"
	}

	fmt.Println("Listening on port:", port)

	err := app.Listen(":" + port)

	if err != nil {
		panic(err)
	}

}
