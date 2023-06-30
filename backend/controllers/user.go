package controllers

import (
	"github/MunBrian/parking-management-system/initializer"
	"github/MunBrian/parking-management-system/models"

	"github.com/gofiber/fiber/v2"
)

func UpdateProfile(c *fiber.Ctx) error {
	//define varible user of type model user
	var user models.User

	//define User struct
	type User struct {
		FirstName   string `json:"firstName"`
		LastName    string `json:"lastName"`
		Email       string `json:"email"`
		UserCategory string `json:"userCategory"`
		ProfilePic []byte `json:"profilepic"`
		Phonenumber  string `json:"phone_number"`
		NationalID string `json:"national_id"`
	}

	//define userData of type user
	var userData User

	//get data from body and assign it to struct userData
	if err := c.BodyParser(&userData); err != nil{
		return c.JSON(err.Error())
	}

	//check if email from body is available in the user DB
	result := initializer.DB.Find(&user, "email = ?", userData.Email)


	//if user doesnot exists
	if result.RowsAffected == 0{
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  fiber.StatusBadRequest,
			"message": "Invalid credentials",
		})
	}


	return nil

}



