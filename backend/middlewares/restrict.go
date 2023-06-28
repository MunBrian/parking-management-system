package middlewares

import (
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
)

func RestrictDashboard(c *fiber.Ctx) error {
	user := c.Locals("user").(*jwt.Token)

	claims := user.Claims.(jwt.MapClaims)

	email := claims["email"].(string)
	category :=  claims["category"].(string)

	c.Set("X-User-Email", email)
	c.Set("X-User-Category", category)

	return c.Next()
}
