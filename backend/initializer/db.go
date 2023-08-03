package initializer

import (
	"fmt"
	"github/MunBrian/parking-management-system/models"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectionToDB() {
	user := os.Getenv("DBUSER")
	password := os.Getenv("PASSWORD")
	dbname := os.Getenv("DBNAME")
	port := os.Getenv("DBPORT")
	host := os.Getenv("HOST")

	dsn := fmt.Sprintf("host=%v user=%v password=%v dbname=%v port=%v", host, user, password, dbname, port)

	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	//handle err
	if err != nil {
		panic("Failed to connect to the database.")
	} else {
		fmt.Println("Successfully connected")
	}
}

// migrate DB
func SyncDB() {
	//make migrations to db if not already created
	err := DB.AutoMigrate(&models.User{})
	if err != nil {
		panic("failed to migrate User model")
	}

	err = DB.AutoMigrate(&models.Vehicle{})
	if err != nil {
		panic("failed to migrate vehicle model")
	}

	
	err = DB.AutoMigrate(&models.ParkingSpace{})
	if err != nil {
		panic("failed to migrate Parking model")
	}

	err = DB.AutoMigrate(&models.Booking{})
	if err != nil {
		panic("failed to migrate Booking model")
	}
}
