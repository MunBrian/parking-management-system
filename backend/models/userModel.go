package models

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	ID uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`

	FirstName        string `json:"first_name" gorm:"not null"`
	LastName    string `json:"last_name" gorm:"not null"`
	ProfilePic   []byte `json:"profilepic"`
	Email        string `json:"email" gorm:"not null"`
	Phonenumber  string `json:"phone_number" gorm:"not null"`
	UserCategory string `json:"user_category" gorm:"not null"`
	NationalID string `json:"national_id"`
	Password     string `json:"password" gorm:"not null"`
	Created     time.Time `gorm:"autoCreateTime"`
    Updated     time.Time `gorm:"autoUpdateTime"`
}
