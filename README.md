# PhotoShare
#### By Luke O'Kane & Martin Malinowski

This project was created as a 2nd Year Rich Web Applications Project. The aim of the project was to create a PhoneGap Wrapped Application with Photo sharing capabilities based around using mobile Geolocation. This project was worth 50% of our overall module marks, this project submission achieved a mark of 95 out of 100 (47.5 out of 50 for the module).

--- 

### Technologies Used

|PhoneGap & PhoneGap Plugins     | Google APIs (Google Maps) |BootStrap|
| ------------- |:-------------:| -----:|
| Javascript     | PHP |  Facebook OAuth |
|PhoneGap 3rd Party Plugins | JQuery      | AJAX |
|JSON     |  MySQL | HTML |

---

### Implemented Functionality created by myself
BootStrap / CSS of my created functionality.
User friendly validation (client and serverside)
- for example internet access checking, phone location turned on, upload or display image success/warning/failure
- JQuery used for user friendly responses.

Session Management
- Keeping track of user interactions with the application with javascript and PHP.

Mobile Administrator Panel
- Search user images
- Delete user images
- Alter user image descriptions

Uploading Image Functionality with GEO Location
- In-app camera taking
- Multiple image uploading from phone's gallery
- Serverside & clientside validation (e.g internet access checking, Phone location turned on, upload success/warnings/failure)

Display Album Images
Edit Album Images
- Delete image.
- Edit image description.

Google Maps Directions from current location.
- Select image and google map displayed with directions from current phone location to where the image was taken.

Display album images on Google Maps
- All album images are displayed on google maps. 
- Markers are place on the map based on image's longitude and latitude stored in the database.
- InfoBox is used to display a sleek user interface to interact when user clicks on a marker on the map.

---

### Other functionality
Facebook OAuth
- User signs up and signs in with their Facebook credentials.

Timeline
- Display all user's uploaded images. 
