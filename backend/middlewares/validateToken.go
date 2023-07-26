package middlewares

import (
	"errors"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
)


func ValidateToken(c *fiber.Ctx) error {
	//get token
	userToken := c.Locals("user").(*jwt.Token)
	if userToken.Valid {
		// Token is valid
		claims := userToken.Claims.(jwt.MapClaims)

		email, ok := claims["email"].(string)
		if !ok {
			return errors.New("failed to retrieve email from token claims")
		}

		category, ok := claims["category"].(string)
		if !ok {
			return errors.New("failed to retrieve category from token claims")
		}

		// Set the email and category in request headers
		c.Set("X-User-Email", email)
		c.Set("X-User-Category", category)

		// Proceed to the next middleware or route handler
		return c.Next()
	}
	
	//if token is invalid send message
	 return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
		 "message": "Invalid token",
	 })

}
