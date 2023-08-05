package controllers

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/jwambugu/mpesa-golang-sdk"
)

//send stkpush
func SendSTKPUSH(c *fiber.Ctx) error{
	appKey := os.Getenv("MPESAKEY")
	appSecret := os.Getenv("MPESASECRET")
	passKey := os.Getenv("PASSKEY")


	type StkBody struct {
		TotalFees string `json:"amount"`
		PhoneNumber string `json:"motorist_phonenumber"`
	}

	var stkData StkBody

	//get body data
	if err := c.BodyParser(&stkData); err != nil{
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  fiber.StatusBadRequest,
			"message": "No body sent",
		})
	}


	totalFees, err :=  strconv.Atoi(stkData.TotalFees)

	if err != nil {
		// Handle the error, such as logging or returning an error response
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  fiber.StatusInternalServerError,
			"message": "Failed to convert motorist phone number",
		})
	}

	motoristPhoneNumber, err :=  strconv.Atoi(stkData.PhoneNumber)
	if err != nil {
		// Handle the error, such as logging or returning an error response
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  fiber.StatusInternalServerError,
			"message": "Failed to convert motorist phone number",
		})
	}


	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()



	//send stk push
    mpesaApp := mpesa.NewApp(http.DefaultClient, appKey, appSecret, mpesa.Sandbox)


    stkPushRes, err := mpesaApp.STKPush(ctx, passKey, mpesa.STKPushRequest{
        BusinessShortCode: 174379,
        TransactionType:   "CustomerPayBillOnline",
        Amount:           	uint(totalFees),	 
		
        PartyA:            254746344408,
        PartyB:            174379,
        PhoneNumber:       uint64(motoristPhoneNumber),
		//PhoneNumber: 254746344408,
		//CallBackURL:       "https://example.com",
       CallBackURL:       os.Getenv("CALLBACKURL"),
        AccountReference:  "ParkIt",
        TransactionDesc:   "ParkSpace pay",
    })



	//return error
	if err != nil{
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  fiber.StatusInternalServerError,
			"message": "Payment process error",
		})
	}

	log.Println(stkPushRes.ResponseCode)


	//check stk response code
	if(stkPushRes.ResponseCode != "0"){
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map {
			"status": fiber.StatusBadRequest,
			"message": "Payment failed",
		})
	}

	 // Return booking record
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status": fiber.StatusOK,
        "message":  "stk push sent successfully",
    })

}



// ProcessPayment handles the Mpesa STK Push Callback.
func ProcessPayment(c *fiber.Ctx) error {
	var res mpesa.STKPushCallback

	if err := c.BodyParser(&res); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"Status":  fiber.StatusBadRequest,
			"Message": err.Error(),
		})
	}

	fmt.Println(res);

	type CallBack struct{
		ResultCode    int    `json:"resultCode"`
		ResultMessage string `json:"resultMessage"`
	}


	// Create a new CallBack object with the necessary data
	sendResult := CallBack{
		ResultMessage: res.Body.STKCallback.ResultDesc,
		ResultCode:    res.Body.STKCallback.ResultCode,
	}


	fmt.Println(sendResult)

	
	type Success struct {
		Message string
	}

	SucessMessage := Success {
		Message: "Payment Sucess",
	}
	
	FailureMessage := Success {
		Message: "Payment Failed",
	}


	if(sendResult.ResultCode != 0){
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"Status":  fiber.StatusBadRequest,
			"message": FailureMessage,
		})	
	}


	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"Status":  fiber.StatusOK,
		"message": SucessMessage,
	})

}


