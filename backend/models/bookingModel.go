package models

import "gorm.io/gorm"

type Booking struct {
	gorm.Model
	MotoristName    string `json:"motorist_name" gorm:"not null"`
	PhoneNumber     string `json:"profilepic"`
	CarNoPlate      string `json:"email" gorm:"not null"`
	ParkingName     string `json:"phonenumber" gorm:"not null"`
	ParkingFee      string `json:"usercategory" gorm:"not null"`
	ParkingLocation string `json:"password" gorm:"not null"`
}
