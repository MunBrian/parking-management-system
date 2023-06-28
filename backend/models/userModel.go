package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	FirstName        string `json:"first_name" gorm:"not null"`
	LastName    string `json:"last_name" gorm:"not null"`
	ProfilePic   []byte `json:"profilepic"`
	Email        string `json:"email" gorm:"not null"`
	Phonenumber  string `json:"phone_number" gorm:"not null"`
	UserCategory string `json:"user_category" gorm:"not null"`
	Password     string `json:"password" gorm:"not null"`
}
