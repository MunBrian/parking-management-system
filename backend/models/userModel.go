package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Name         string `json:"name" gorm:"not null"`
	ProfilePic   []byte `json:"profilepic"`
	Email        string `json:"email" gorm:"not null"`
	Phonenumber  string `json:"phonenumber" gorm:"not null"`
	UserCategory string `json:"usercategory" gorm:"not null"`
	Password     string `json:"password" gorm:"not null"`
}
