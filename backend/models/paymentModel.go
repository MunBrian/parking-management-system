package models

type Payment struct {
	MotoristID string `json:"motorist_name" gorm:"not null"`
	ParkingID  string `json:"profilepic"`
}
