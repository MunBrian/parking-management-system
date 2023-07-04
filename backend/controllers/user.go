package controllers

import (
	"github/MunBrian/parking-management-system/initializer"
	"github/MunBrian/parking-management-system/models"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func UpdateProfile(c *fiber.Ctx) error {
	//define varible user of type model user
	var user models.User


	//define a struct, User
	type User struct{
		ID  string `json:"id"`
		FirstName        string `json:"first_name"`
		LastName    string `json:"last_name"`
		ProfilePic   []byte `json:"profilepic"`
		Email        string `json:"email"`
		Phonenumber  string `json:"phone_number"`
		NationalID string `json:"national_id"`
	}

	//define a struct userData of type User
	var userData User

	//get data from body and assign it to struct userData
	if err := c.BodyParser(&userData); err != nil{
		return c.JSON(err.Error())
	}


	//check if email from body is available in the user DB
	initializer.DB.Find(&user, "id = ?", userData.ID)


	//if user doesnot exists
	if user.ID == uuid.Nil{
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  fiber.StatusBadRequest,
			"message": "Invalid credentials",
		})
	}

	//if user exists, Update only the provided fields from the request body
	initializer.DB.Model(&user).Updates(models.User{
		FirstName:   userData.FirstName,
		LastName:    userData.LastName,
		ProfilePic:  userData.ProfilePic,
		Email:       userData.Email,
		Phonenumber: userData.Phonenumber,
		NationalID:  userData.NationalID,
		Updated:   time.Now(), // Manually set the updated_at field
	})

	//return user
	return c.Status(fiber.StatusOK).JSON(user)
}



