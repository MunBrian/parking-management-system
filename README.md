# Project Title
[Park-It](https://park-it-flame.vercel.app) - A parking management system.

## Description
- Park-It is a parking management system that helps motorist quickly find parking spots within the city.
- Park-It also helps parking owners track their parking spaces from money collection, parking space report genration and many more features.
- Park-It has also has addressed authentication and authorization security issues by implementing JWT.
- Park-It is reponsive across different devices from desktop, tablet to mobile phones.
- Park-It also supports light and dark mode.
  
Park-It features include:

<ins>Motorist</ins>
- Authentication  and security which covers - sign up, login, reset password, JWT.
- Setting up profile - which include name, phonenumber, national id among other necessary credentials.
- Vehicle information - Motorist must list the type of vehicle model and vehicle number plate which is required before making booking.
- Dashboard - Motorists are provided with a dashboard which summarizes important information about booking, which included  money spent, total minutes, table showing latest bookings, and a graph showing money spending across the week.
- Find parking spot - motorist are provided with a map to search and book their nearest parking spots.
- Payment - Motorist are provided with a payment platform, Mpesa, to make successfull payment easily and effeciently from their mobile phones.
- Receipt - Motorists are issued with receipt upon successfull booking parking spot. The receipts can be downloaded in pdf format.
- Reports - Motorist can generate reports to view their spending and past parking spot booking information.
  

<ins>Parking Space Owners</ins>
- Authentication  and security which covers - sign up, login, reset password, JWT.
- Setting up profile - which include, profile photo, name, phonenumber, national id among other necessary credentials.
- Dashboard - Parking space owners are provided with a dashboard which summarizes important information about booking, which included total money collected, total booking space minutes, table showing latest bookings, and a graph showing money collected across the week.
- List parking space - Park-It enable parking space owners to list their parking spaces and provide details about the parking space including city, street, charges per hour, parking space image, among others.
- Adjust parking location - Parking space owners are allowed to adjust and correctly pin their parking space for accurate location and navigation by the motorists.
- Management of parking space - Parking owners are allowed to view all their parking spaces and delete if they need to do so.
- Reports - Parking space owners are issued reports to view parking spaces booking information. Which they can choose to download in pdf format.

**Tech Stack**  used to create Park-It:

<ins>frontend</ins>
* React - Vite
* TailwindCss - Styling

<ins>backend</ins>
* Go Fiber, a Golang backend web framework.

<ins>database.</ins>
* PostgreSQL 

<ins>ORM library.</ins>
* GORM

<ins>Map</ins>
* [Leaflet](https://react-leaflet.js.org/)

<ins>Payment Platform.</ins>
* [Mpesa](https://www.safaricom.co.ke/personal/m-pesa/do-more-with-m-pesa)

<ins>Hosting and Deployment</ins>
* [Vercel](https://vercel.com) - Frontend Deployment
* [Railway](https://railway.app/) - Backend Deployment
* [Amazon RDS](https://aws.amazon.com/rds/) - Postgresql Database hosting

## Getting started

You must first ensure that you have a [PostgreSQL](https://www.postgresql.org/) database on your local machine.

To install this project:
1. Clone the repository to your local machine. You can do this by running the following command on your terminal.

```
	git clone https://github.com/MunBrian/parking-management-system
```

2. Navigate to the project directory then navigate to the frontend folder and install the required dependencies by running:

```
	npm install
```

3. Navigate to the backend folder and install the required Golang dependencies by running this command on the terminal:

```
	go mod tidy
```

4. On your backend root folder create a .env file with the following variables:

```
DBNAME="<database name>"
DBPORT="<database port>"
DBUSER="<database username>"
PASSWORD="<database password>"
SECRET="<secret key to sign your jwt token>"
EMAILPASSWORD="<sender email password>"
EMAIL="<sender email address>"
MPESAKEY="<Mpesa key - can be found on daraja api>"
MPESASECRET="<Mpesa secret - can be found on daraja api>"
CALLBACKURL="<a valid https url which will be used by mpesa to send callback after stkpush is done>"
FRONTENDURL="http://localhost:5173"
```

- Generate a one-time Gmail app password in your Gmail account and use it as the value of the "EMAILPASSWORD" env variable.

5. On your frontend root folder create a .env file with the following variable:

```
  VITE_SERVER_URL="http://localhost:8000 - <my backend is running on port 8000, make sure you set the port number to 8000 or edit to your liking> "
```

## Usage

1. Start the PostgreSQL database, by running the following command:
	- On Windows
		1. Open the Windows command prompt or PowerShell
		2. Navigate to the directory where PostgreSQL is installed (usually `C:\Program Files\PostgreSQL\<version>\bin` ).
		3. Run the `pg_ctl` command with the `-D` option and the path to your data directory. For Example:  
		```
			pg_ctl -D C:\Program Files\PostgreSQL\<version>\data start
		```

	- On Linux using Ubuntu
		1. Open the Ubuntu terminal on your system.
		2. Type the following command to start the PostgreSQL server:
		```
			sudo service postgresql start
		```
				
2. Navigate to the backend folder on the project folder and run the following command on your terminal to start the server:
```
	go run main.go
```

3. Navigate to the frontend folder on the project folder and open a new terminal and run the following command on your terminal to run the react scripts:
```
	npm run dev
```

## Images
1. Login page
   
   ![Screenshot (50)](https://github.com/MunBrian/parking-management-system/assets/63002200/b0858486-7676-414d-a661-d45340b7deeb)
   
2. Dashboard page - As viewed by a parking space owner.
   
   ![WhatsApp Image 2023-08-18 at 1 22 36 PM](https://github.com/MunBrian/parking-management-system/assets/63002200/e2908720-78f0-4675-9a40-afc35af56e50)

3. Dashboard page - As viewed by a motorist on light mode.
   
   ![WhatsApp Image 2023-08-18 at 1 32 44 PM](https://github.com/MunBrian/parking-management-system/assets/63002200/bb29b303-68f4-4ce5-88f1-43e583bc0e5a)

4. Responsive view - Mobile phone.
   
  ![Screenshot (56)](https://github.com/MunBrian/parking-management-system/assets/63002200/a3803a30-06b3-471a-9def-4b18d491e567)

## Contact
If you have any questions or feedback about this project you can contact me via my email address 
[bk.mungai254@gmail.com](mailto:bk.mungai254@gmail.com)

