package controllers

import "github.com/gofiber/fiber/v2"

func Dashboard(c *fiber.Ctx) error {
	name := c.GetRespHeader("X-User-Name")
	category := c.GetRespHeader("X-User-Category")

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"name":          name,
		"user-category": category,
	})
}
