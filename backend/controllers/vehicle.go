package controllers

import (
	"github/MunBrian/parking-management-system/initializer"
	"github/MunBrian/parking-management-system/models"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)


func CreateVehicle(c* fiber.Ctx) error {
	var vehicle models.Vehicle

	var user models.User

	if err := c.BodyParser(&vehicle); err != nil{
		return c.JSON(err.Error())
	}


	//check if email from body is available in the user DB
	initializer.DB.Find(&user, "id = ?", vehicle.UserID)


	//check if user exists
	if user.ID == uuid.Nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  fiber.StatusBadRequest,
			"message": "Invalid Credentials",
		})
	}


	//create new vehicle with values from vehicle struct
	initializer.DB.Create(&vehicle)


	//return vehicle struct
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"vehicle": vehicle,
	})

}

