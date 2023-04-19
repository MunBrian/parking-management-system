package controllers

import (
	"github/MunBrian/parking-management-system/initializer"
	"github/MunBrian/parking-management-system/models"

	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

func SignUp(c *fiber.Ctx) error {
	var user models.User

	if err := c.BodyParser(&user); err != nil {
		return c.JSON(err.Error())
	}

	initializer.DB.Where("email = ?", user.Email).First(&user)

	if user.ID != 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  fiber.StatusBadRequest,
			"message": "User with this email already exists",
		})
	}

	userPassword := user.Password

	hashPassword, _ := hashPassword(userPassword)

	user.Password = hashPassword

	initializer.DB.Create(&user)

	return c.JSON(user)
}

func Login(c *fiber.Ctx) error {
	type LoginData struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	var formData LoginData

	var user models.User

	if err := c.BodyParser(&formData); err != nil {
		return c.JSON(err.Error())
	}

	initializer.DB.Where("email = ?", formData.Email).First(&user)

	if user.ID == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  fiber.StatusBadRequest,
			"message": "Invalid Credentials",
		})
	}

	match := checkPasswordHash(formData.Password, user.Password)

	if !match {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  fiber.StatusBadRequest,
			"message": "Invalid Credentials",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "successfully logged in.",
	})
}

// generate hashed password
func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

// compare passwords
func checkPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
