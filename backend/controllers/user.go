package controllers

import (
	"fmt"
	"github/MunBrian/parking-management-system/initializer"
	"github/MunBrian/parking-management-system/models"
	"time"

	"io"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func UpdateProfile(c *fiber.Ctx) error {
	
	// Parse multi-part form data
    form, err := c.MultipartForm()
    if err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "status":  fiber.StatusBadRequest,
            "message": "Failed to parse form data",
        })

	}

	// Get the form values and file data
    fields := form.Value

    // Retrieve user ID from form fields
    userID := fields["ID"][0]

    // Check if user exists
    var user models.User
    initializer.DB.Find(&user, "id = ?", userID)
    if user.ID == uuid.Nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "status":  fiber.StatusBadRequest,
            "message": "Invalid credentials",
        })
    }

	// Update user fields
    updatedUser := models.User{
        FirstName:   fields["First_name"][0],
        LastName:    fields["Last_name"][0],
        Email:       fields["Email"][0],
        Phonenumber: fields["Phonenumber"][0],
        NationalID:  fields["Nationalid"][0],
        Updated:     time.Now(),
    }

	fmt.Println(form)

    // Handle profile picture upload if available
	if profilePicFile, err := c.FormFile("Profilepic"); err == nil {
		file, err := profilePicFile.Open()
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"status":  fiber.StatusInternalServerError,
				"message": "Failed to open the uploaded file",
			})
		}
		defer file.Close()

		
        // Read the file data into a byte slice
        data, err := io.ReadAll(file)
        if err != nil {
            return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
                "status":  fiber.StatusInternalServerError,
                "message": "Failed to read the file data",
            })
        }

        // Assign the file data to the user's profile picture field
        updatedUser.ProfilePic = data
    }

    // Update the user in the database
    initializer.DB.Model(&user).Updates(updatedUser)

    // Return the updated user
    return c.Status(fiber.StatusOK).JSON(fiber.Map{
        "status": fiber.StatusOK,
        "user":   user,
    })
}



