package controllers

import (
	"github/MunBrian/parking-management-system/models"

	"github.com/gofiber/fiber/v2"
)

func BookParkingSpace(c *fiber.Ctx) error {
	var booked models.Booking

	if err := c.BodyParser(&booked); err != nil {
		return c.JSON(err.Error())
	}

	return c.SendString("This is the booking page")
}
