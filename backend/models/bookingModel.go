package models

import (
	"time"

	"github.com/google/uuid"
)

type Booking struct {
	ID uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`

	Date     string `json:"date" gorm:"not null"`
	Day     string `json:"day" gorm:"not null"`
	ParkingID string `json:"parking_id"  gorm:"not null"`
	MotoristID string `json:"motorist_id"  gorm:"not null"`
	ParkingName string `json:"parking_name"  gorm:"not null"`
	ParkingSlot string `json:"parking_slot"  gorm:"not null"`
	ParkingAddress string `json:"parking_address"  gorm:"not null"`
	MotoristName string `json:"motorist_name"  gorm:"not null"`
	MotoristPhoneNumber string `json:"motorist_phonenumber"  gorm:"not null"`
	VehicleModel string `json:"vehicle_model"  gorm:"not null"`
	VehiclePlate string `json:"vehicle_plate"  gorm:"not null"`
	ToTime string `json:"to_time"  gorm:"not null"`
	FromTime string `json:"from_time"  gorm:"not null"`
	ParkingDuration int `json:"parking_duration"  gorm:"not null"`
	TotalFees int `json:"total_fees"  gorm:"not null"`
	Created     time.Time `gorm:"autoCreateTime"`
    Updated     time.Time `gorm:"autoUpdateTime"`
}
