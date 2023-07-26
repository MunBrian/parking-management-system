package controllers

import (
	"fmt"
	"github/MunBrian/parking-management-system/initializer"
	"github/MunBrian/parking-management-system/models"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)


func CreateVehicle(c* fiber.Ctx) error {
	var vehicle models.Vehicle

	//create new struct to hold body value 
	type VehicleData struct{
		ID string `json:"Id" gorm:"not null"`
		VehicleModel string `json:"vehicleModel" gorm:"not null"`
		VehiclePlate string `json:"vehiclePlate" gorm:"not null"`
	}

	//create struct  vehicleupdate from updatedVehicle
	var newVehicle VehicleData

	var user models.User

	if err := c.BodyParser(&newVehicle); err != nil{
		return c.JSON(err.Error())
	}

	fmt.Print(newVehicle)

	//check if email from body is available in the user DB
	initializer.DB.Find(&user, "id = ?", newVehicle.ID)


	//check if user exists
	if user.ID == uuid.Nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  fiber.StatusBadRequest,
			"message": "Invalid Credentials",
		})
	}

	vehicle.UserID = newVehicle.ID
	vehicle.VehicleModel = newVehicle.VehicleModel
	vehicle.VehiclePlate = newVehicle.VehiclePlate


	//create new vehicle with values from vehicle struct
	initializer.DB.Create(&vehicle)


	//return vehicle struct
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status": fiber.StatusOK,
		"vehicle": vehicle,
	})

}


func GetVehicle(c* fiber.Ctx) error {
	var vehicle models.Vehicle

	//get id from params
	userID :=  c.Params("id")


	//check if user id from param is available in the vehicle DB
	initializer.DB.Find(&vehicle, "user_id = ?", userID)


	//check vehicle with the user doesnot exists
	if vehicle.ID == uuid.Nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  fiber.StatusBadRequest,
			"message": "Invalid Credentials",
		})
	}

	//send vehicle details
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status": fiber.StatusOK,
		"vehicle": vehicle,
	})
}


func UpdateVehicle(c* fiber.Ctx) error {
	//create struct vehicle of type models vehicle
	var vehicle models.Vehicle

	//create new struct to hold body value 
	type UpdatedVehicle struct{
		ID string `json:"Id" gorm:"not null"`
		VehicleModel string `json:"vehicleModel" gorm:"not null"`
		VehiclePlate string `json:"vehiclePlate" gorm:"not null"`
	}

	//create struct  vehicleupdate from updatedVehicle
	var vehicleUpdate UpdatedVehicle

	//Parse data from body to the vehickeUpdate struct
	if err := c.BodyParser(&vehicleUpdate); err != nil{
		return c.JSON(err.Error())
	}

	//check if id from body is available in the vehicle DB
	initializer.DB.Find(&vehicle, "id = ?", vehicleUpdate.ID)

	//if vehicle doesnot exists
	if vehicle.ID == uuid.Nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  fiber.StatusBadRequest,
			"message": "Invalid Credentials",
		})
	}

	//update values of vehicle DB to updated one from body
	vehicle.VehicleModel = vehicleUpdate.VehicleModel
	vehicle.VehiclePlate = vehicleUpdate.VehiclePlate

	//save updated vehicle in initializers.DB
	initializer.DB.Save(&vehicle)

	//send vehicle
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status": fiber.StatusOK,
	})
}