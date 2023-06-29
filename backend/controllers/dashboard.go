package controllers

import (
	"github/MunBrian/parking-management-system/initializer"
	"github/MunBrian/parking-management-system/models"

	"github.com/gofiber/fiber/v2"
)

func Dashboard(c *fiber.Ctx) error {

	//declare user struct of type models user
	var user models.User

	//get email value from JWT token 
	email := c.GetRespHeader("X-User-Email")

	//check if email from body is available in the user DB
	initializer.DB.Find(&user, "email = ?", email)

	//define a struct userResponse to hold the desired values from user struct
	userResponse := struct {
		FirstName   string `json:"firstName"`
		LastName    string `json:"lastName"`
		Email       string `json:"email"`
		UserCategory string `json:"userCategory"`
		ProfilePic []byte `json:"profilepic"`
		Phonenumber  string `json:"phone_number"`
		NationalID string `json:"national_id"`
	}{
		FirstName:   user.FirstName,
		LastName:    user.LastName,
		Email:       user.Email,
		UserCategory: user.UserCategory,
		ProfilePic: user.ProfilePic,
		Phonenumber: user.Phonenumber,
		NationalID: user.NationalID,
	}

	//send user data
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"user": userResponse,
	})
}



