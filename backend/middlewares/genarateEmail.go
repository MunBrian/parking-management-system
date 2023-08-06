package middlewares

import (
	"fmt"
	"net/smtp"
	"os"
)

func GenerateEmail(email []string, name, token string) error {

	var err error

	frontendURL := os.Getenv("FRONTENDURL")

	body := fmt.Sprintf(`<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password on Park-It</title>
</head>
<body>
	<p>Hello, %v</p>

    <p>Someone requested a new password for your account on <a href="%v" target="_blank">Park-It</a></p>
    
    <p>You can reset your password, by click on the link below.</p>
    
    <a href="%v/reset-password/%v" target="_blank">Password reset</a>
    
    <p>if you did not make this request, then you can ignore this message. </p>
</body>
</html>`, name, frontendURL, frontendURL, token)

	auth := smtp.PlainAuth(
		"",
		os.Getenv("EMAIL"),
		os.Getenv("EMAILPASSWORD"),
		"smtp.gmail.com",
	)

	headers := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";"

	msg := "Subject:Reset Password on Park-It\n" + headers + "\n\n" + body

	err = smtp.SendMail(
		"smtp.gmail.com:587",
		auth,
		os.Getenv("EMAIL"),
		email,
		[]byte(msg),
	)

	if err != nil {
		return err
	}

	return nil
}