package controllers

import (
	"fmt"
	"github/MunBrian/parking-management-system/initializer"
	"github/MunBrian/parking-management-system/models"
	"io"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/shopspring/decimal"
)

//create parking record
func CreateParkingSpace(c* fiber.Ctx) error {
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
    ownerID := fields["owner_id"][0]

    // Check if user exists
    var user models.User
    initializer.DB.Find(&user, "id = ?", ownerID)
    if user.ID == uuid.Nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "status":  fiber.StatusBadRequest,
            "message": "Invalid credentials",
        })
    }

	// Update user fields
    parkingSpace := models.ParkingSpace{
        Name:   fields["parking_name"][0],
        OwnerId:    fields["owner_id"][0],
        ParkingInitial: fields["parking_initial"][0],
        ParkingCity:  fields["parking_city"][0],
		ParkingStreet: fields["parking_street"][0],
    }

	fmt.Println(form)

    // Handle first parking image upload if available
	if ParkingImage1, err := c.FormFile("parking_image_1"); err == nil {
		file, err := ParkingImage1.Open()
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
        parkingSpace.ParkingImage1 = data
    }

	// Handle second parking image upload if available
	if ParkingImage2, err := c.FormFile("parking_image_2"); err == nil {
		file, err := ParkingImage2.Open()
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
        parkingSpace.ParkingImage2 = data
    }


	parkingSlots, err := strconv.Atoi(fields["parking_slots"][0])
	if err != nil {
		// Handle the error, such as logging or returning an error response
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  fiber.StatusInternalServerError,
			"message": "Failed to convert",
		})
	}


	parkingFee, err := strconv.Atoi(fields["parking_fee"][0])
	if err != nil {
		// Handle the error, such as logging or returning an error response
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  fiber.StatusInternalServerError,
			"message": "Failed to convert",
		})
	}


	latitude, err := decimal.NewFromString(fields["parking_lat"][0])
	if err != nil {
		// Handle the error
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  fiber.StatusInternalServerError,
			"message": "Failed to convert",
		})
	}

	longitude, err := decimal.NewFromString(fields["parking_lng"][0])
	if err != nil {
		// Handle the error
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  fiber.StatusInternalServerError,
			"message": "Failed to convert",
		})
	}


	parkingSpace.ParkingSlots = parkingSlots
	parkingSpace.ParkingFee = parkingFee
	parkingSpace.ParkingLatitude = latitude
	parkingSpace.ParkingLongitude = longitude


    //create parking space with values from vehicle struct
	initializer.DB.Create(&parkingSpace)

    // Return parking space
    return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status": fiber.StatusOK,
        "parking_space":   parkingSpace,
    })
}

//get owner's parking space
func GetOwnerParkingSpace(c* fiber.Ctx) error {
	var parkingSpaces []models.ParkingSpace

		// Get owner id from params
	ownerID := c.Params("id")

	// Find all parking spaces owned by the user
	initializer.DB.Find(&parkingSpaces, "owner_id = ?", ownerID)

	// If no parking spaces found for the owner
	if len(parkingSpaces) == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":  fiber.StatusNotFound,
			"parking_data": parkingSpaces,
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":      fiber.StatusOK,
		"parking_data": parkingSpaces,
	})

}


//get All parking spaces
func GetAllParkingSpaces(c* fiber.Ctx) error {
	var parkingSpaces []models.ParkingSpace

	// Find all parking spaces in the db
	initializer.DB.Find(&parkingSpaces)


	//return all parking spaces
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":      fiber.StatusOK,
		"parkings": parkingSpaces,
	})

}


//get specific parking space
func GetParkingSpace(c* fiber.Ctx) error {
	var parkingSpace models.ParkingSpace

		// Get owner id from params
	parkingID := c.Params("id")

	// Find the parking space
	initializer.DB.Find(&parkingSpace, "id = ?", parkingID)

	if parkingSpace.ID == uuid.Nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "status":  fiber.StatusBadRequest,
            "message": "Not found",
        })
    }

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":      fiber.StatusOK,
		"parking": parkingSpace,
	})

}


//delete parking record
func DeleteParkingSpace(c* fiber.Ctx) error {
	var parkingSpace models.ParkingSpace

	parkingID := c.Params("id")

	//check if parking exist
	initializer.DB.Find(&parkingSpace, "id = ?", parkingID)

	//if parking space doesnot exists
	if(parkingSpace.ID == uuid.Nil){
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":  fiber.StatusNotFound,
			"message": "Parking Space not found",
		})
	}

	//delete parking record
	initializer.DB.Delete(&parkingSpace)

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status": fiber.StatusOK,
})
}