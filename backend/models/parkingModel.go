package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/shopspring/decimal"
)

type ParkingSpace struct {
	ID uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`

	Name     string `json:"parking_name" gorm:"not null"`
	OwnerId string `json:"owner_id"  gorm:"not null"`
	ParkingSlots int `json:"parking_slots"  gorm:"not null"`
	ParkingInitial string `json:"parking_initial"  gorm:"not null"`
	ParkingFee int `json:"parking_fee"  gorm:"not null"`
	ParkingCity string `json:"parking_city"  gorm:"not null"`
	ParkingStreet string `json:"parking_street"  gorm:"not null"`
	ParkingImage1 []byte `json:"parking_image_1"  gorm:"type:bytea"`
	ParkingImage2 []byte `json:"parking_image_2"  gorm:"type:bytea"`
	ParkingLatitude decimal.Decimal `json:"parking_lat" gorm:"type:numeric"`
	ParkingLongitude decimal.Decimal `json:"parking_lng" gorm:"type:numeric"`
	Created     time.Time `gorm:"autoCreateTime"`
    Updated     time.Time `gorm:"autoUpdateTime"`
}
