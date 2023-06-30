package controllers

import (
	"errors"
	"github/MunBrian/parking-management-system/initializer"
	"github/MunBrian/parking-management-system/models"
	"os"
	"time"

	"gorm.io/gorm"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

func SignUp(c *fiber.Ctx) error {
	//create a struct user of type User model
	var user models.User

	//get data from body and assign in to the user struct
	if err := c.BodyParser(&user); err != nil {
		return c.JSON(err.Error())
	}

	// Find user with the matching email
	result := initializer.DB.Where("email = ?", user.Email).First(&user)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			//User with the given email does not exist
			
			//assign password from body data to userPassword var
			userPassword := user.Password

			//get value of hashpassword from the hashpassword function
			hashPassword, _ := hashPassword(userPassword)

			//assigned the hashedpassword value to the user struct password
			user.Password = hashPassword

			//create new user with values from user struct
			initializer.DB.Create(&user)

			//print user struct
			// fmt.Println(user)

			return c.JSON(user)
		} else {
			// Error occurred during the query
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"status":  fiber.StatusInternalServerError,
				"message": "Error retrieving user from the database",
			})
		}
	} else {
		// User with the given email already exists
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  fiber.StatusBadRequest,
			"message": "User with this email already exists",
		})
	}
}

func Login(c *fiber.Ctx) error {
	//create a struct LoginData
	type LoginData struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	//create a struct formData of type LoginData
	var formData LoginData

	//create a struct user of type models.User
	var user models.User

	//get data from body and assign it to struct
	if err := c.BodyParser(&formData); err != nil {
		return c.JSON(err.Error())
	}

	//check if email from body is available in the user DB
	initializer.DB.Find(&user, "email = ?", formData.Email)


	//check if user exists
	if user.ID == uuid.Nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  fiber.StatusBadRequest,
			"message": "Invalid Credentials",
		})
	}

	//check if user password matches that provided in the body
	match := checkPasswordHash(formData.Password, user.Password)

	//if passwords don't match, throw error
	if !match {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  fiber.StatusBadRequest,
			"message": "Invalid Credentials",
		})
	}

	//generate token, with user's email and category as parameters
	token, err := generateToken(user.Email, user.UserCategory)

	//if no token throw error
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "missing token",
		})
	}

	//if ok, send token to the frontend
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"token":   token,
		"message": "successfully log in.",
	})
}

// generate hashed password
func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

// compare passwords
func checkPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func generateToken(email string, category string) (string, error) {

	claims := jwt.MapClaims{
		"email":      email,
		"category": category,
		"exp":           time.Now().Add(time.Hour * 72).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	t, err := token.SignedString([]byte(os.Getenv("SECRET")))

	//return message  to user
	return t, err
}
