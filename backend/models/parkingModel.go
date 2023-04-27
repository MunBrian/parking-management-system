package models

import "gorm.io/gorm"

type ParkingSpace struct {
	gorm.Model
	Name     string `json:"parking_name" gorm:"not null"`
	Location string `json:"location" gorm:"not null"`
	Fees     string `json:"parking_fees" gorm:"not null"`
	Owner    string `json:"parking_owner" gorm:"not null"`
	Status   string `json:"parking_status" gorm:"not null"`
}
