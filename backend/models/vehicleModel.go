package models

import (
	"time"

	"github.com/google/uuid"
)

type Vehicle struct {
	ID uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`

	UserID string `json:"user-id" gorm:"not null"`
	VehicleModel string `json:"vehicle-model" gorm:"not null"`
	VehiclePlate string `json:"vehicle-plate" gorm:"not null"`
	Created     time.Time `gorm:"autoCreateTime"`
    Updated     time.Time `gorm:"autoUpdateTime"`
}
