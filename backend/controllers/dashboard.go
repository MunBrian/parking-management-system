package controllers

import (
	"github/MunBrian/parking-management-system/initializer"
	"github/MunBrian/parking-management-system/models"

	"encoding/base64"

	"github.com/gofiber/fiber/v2"
)

func Dashboard(c *fiber.Ctx) error {

	//declare user struct of type models user
	var user models.User

	//get email value from JWT token 
	email := c.GetRespHeader("X-User-Email")

	//check if email from body is available in the user DB
	initializer.DB.Find(&user, "email = ?", email)

	// Encode the profile picture data as base64
	encodedProfilePic := base64.StdEncoding.EncodeToString(user.ProfilePic)


	//define a struct userResponse to hold the desired values from user struct
	userResponse := struct {
		FirstName   string `json:"firstName"`
		LastName    string `json:"lastName"`
		Email       string `json:"email"`
		UserCategory string `json:"userCategory"`
		ProfilePic  string `json:"profilepic"`
		Phonenumber  string `json:"phone_number"`
		NationalID string `json:"national_id"`
		ID string `json:"id"`
	}{
		FirstName:   user.FirstName,
		LastName:    user.LastName,
		Email:       user.Email,
		UserCategory: user.UserCategory,
		ProfilePic: encodedProfilePic,
		Phonenumber: user.Phonenumber,
		NationalID: user.NationalID,
		ID: user.ID.String(),
	}

	//send user data
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"user": userResponse,
	})

	
}



