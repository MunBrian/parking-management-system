package middlewares

import (
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
)

func RestrictDashboard(c *fiber.Ctx) error {
	user := c.Locals("user").(*jwt.Token)

	claims := user.Claims.(jwt.MapClaims)

	name := claims["username"].(string)

	category := claims["user-category"].(string)

	c.Set("X-User-Name", name)
	c.Set("X-User-Category", category)

	return c.Next()
}
