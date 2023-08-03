package controllers

import (
	"github/MunBrian/parking-management-system/initializer"
	"github/MunBrian/parking-management-system/models"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)



func BookParkingSpace(c *fiber.Ctx) error {

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

	// Retrieve parking id from formdata
    parkingID := fields["parking_id"][0]


    // Check if user exists
    var parkingSpace models.ParkingSpace
    initializer.DB.Find(&parkingSpace, "id = ?", parkingID)
    if parkingSpace.ID == uuid.Nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "status":  fiber.StatusBadRequest,
            "message": "Invalid credentials",
        })
    }
	

	// Update bookings fields
    booking := models.Booking{
        Date: fields["date"][0],
		Day: fields["day"][0],
		ParkingID: fields["parking_id"][0],
		MotoristID: fields["motorist_id"][0],
		ParkingName: fields["parking_name"][0],
		ParkingSlot: fields["parking_slot"][0],
		ParkingAddress: fields["parking_address"][0],
		MotoristName: fields["motorist_name"][0],
		MotoristPhoneNumber: fields["motorist_phonenumber"][0],
		VehicleModel: fields["vehicle_model"][0],
		VehiclePlate: fields["vehicle_plate"][0],
		ToTime: fields["to_time"][0],
		FromTime: fields["from_time"][0],
    }


	parkingDuration, err := strconv.Atoi(fields["parking_duration"][0])
	if err != nil {
		// Handle the error, such as logging or returning an error response
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  fiber.StatusInternalServerError,
			"message": "Failed to convert",
		})
	}

	totalFees, err := strconv.Atoi(fields["total_fees"][0])
	if err != nil {
		// Handle the error, such as logging or returning an error response
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  fiber.StatusInternalServerError,
			"message": "Failed to convert",
		})
	}

	booking.ParkingDuration = parkingDuration
	booking.TotalFees = totalFees

	
	//create booking record from form data
	initializer.DB.Create(&booking)

    // Return booking record
    return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status": fiber.StatusOK,
        "booking":   booking,
    })
	
}


func GetMotoristBookingData(c *fiber.Ctx) error{
	var bookings []models.Booking

	//get user id from params
	motoristID := c.Params("id")

	//get all motorist bookings
	initializer.DB.Find(&bookings, "motorist_id = ?", motoristID)

	// If no parking spaces found for the owner
	if len(bookings) == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":  fiber.StatusNotFound,
			"bookings": bookings,
		})
	}
	
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":      fiber.StatusOK,
		"bookings": bookings,
	})

}


func GetOwnerBookingData(c *fiber.Ctx) error {
	var bookings []models.Booking
	var parkingSpaces []models.ParkingSpace

	// Get owner ID from params
	ownerID := c.Params("id")

	// Find all parking spaces owned by the user
	initializer.DB.Find(&parkingSpaces, "owner_id = ?", ownerID)

	// If no parking spaces found for the owner
	if len(parkingSpaces) == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":       fiber.StatusNotFound,
			"parking_data": parkingSpaces,
		})
	}

	// Get the parking space IDs
	parkingSpaceIDs := getParkingSpaceIDs(parkingSpaces)

	// Find bookings that match the parking space IDs
	initializer.DB.Where("parking_id IN ?", parkingSpaceIDs).Find(&bookings)

	// If no matching bookings found
	if len(bookings) == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":  fiber.StatusNotFound,
			"message": "No matching bookings found",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":            fiber.StatusOK,
		"bookings": bookings,
	})
}

// Function to get the parking space IDs from the parkingSpaces slice
func getParkingSpaceIDs(parkingSpaces []models.ParkingSpace) []uuid.UUID {
	parkingSpaceIDs := make([]uuid.UUID, len(parkingSpaces))
	for i, parkingSpace := range parkingSpaces {
		parkingSpaceIDs[i] = parkingSpace.ID
	}
	return parkingSpaceIDs
}


func GetBookingData(c *fiber.Ctx) error{
	var booking models.Booking

	//get user id from params
	bookingID := c.Params("id")

	//get all motorist bookings
	initializer.DB.Find(&booking, "id = ?", bookingID)

	// If booking exist
	if booking.ID == uuid.Nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "status":  fiber.StatusBadRequest,
            "message": "Invalid credentials",
        })
    }

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":      fiber.StatusOK,
		"booking": booking,
	})

}


func GetAllBookings(c *fiber.Ctx) error {
	var bookings []models.Booking

	// Find all parking spaces in the db
	initializer.DB.Find(&bookings)


	//return all parking spaces
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":      fiber.StatusOK,
		"bookings": bookings,
	})

}

