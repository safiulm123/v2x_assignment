# V2X Network Assingment

As a Web or App developer I want to request a (filtered) list of offers and for each offer some more detailed information so that I can process/display this information in the Web or App.


# API

Different kind of filtered APIs are developed so that it is easier to get the required data.

## Requirement 1

The first requirement is to display list of orders with **visible** set to **true**. The URL to get the information is 

    http://localhost:5000/filtered_visible

### Request
There are no inputs that are required by the user.

### Response
 The response will be an array of those items that has visible set to true
 
## Requirement 2

The requirements are

 1. Total number of returned Offers
 2. The list of Offer should only contain the following information
	 
	 1. id
	 2. Complete teaser Information
	 3. detailUrl
	 4. Labels 
	 5. Price
	
     http://localhost:5000/filtered_specific_data

### Request
There are no inputs that are required by the user.

### Response
 The response will be a 200OK with the following JSON keys 
 1. **TotalUsers** 
 2.  **Items** which will be a JSON Array with id, teaser, detailUrl, labels and price information 

## Requirement 3
The requirements is to show list of offers limited to the user input as a number. (e.g. return only 10 offers)

     http://localhost:5000/limit_filter

### Request
There are some JSON keys that are required by the user

    {limit: <UserInput>}

### Response
 The response will be a 200-OK with the following JSON keys
 1.  **Items** which will be a JSON Array and the length of the array will be the limit provided by the user

## Requirement 4

The requirements are

 1. Total number of returned Offers
 2. The list of Offer should only contain the following information
	 
	 1. id
	 2. Complete teaser Information
	 3. detailUrl
	 4. Labels 
	 5. Price
	
     http://localhost:5000/filtered_specific_data

### Request
There are no inputs that are required by the user.

### Response
 The response will be a 200OK with the following JSON keys 
 1. **TotalUsers** 
 2.  **Items** which will be a JSON Array with id, teaser, detailUrl, labels and price information 

## Requirement 5

The requirement for this API is to display the list of offers in ascending order by price
	
     http://localhost:5000/sorted_by_price

### Request
There are no inputs that are required by the user.

### Response
 The response will be a 200OK with a **JSON Array** and all the prices will be in **ascending order**.

## Requirement 6

The requirement is to show a detailed offer for which visible is set to true 
	
     http://localhost:5000/detailedInfo_visible_ByID

### Request
There is one input that is required by the user and that is required to check if the id has visible to true or not.

    { "id":"114"}

### Response
 The response will be a 200OK with the following JSON keys
 - **200-OK** - Items with the detailed offer will be shared 
 -  **400- Bad Request** -  If the visible is set to false then it will notify that visible is set to false

## Requirement 7

The requirements is to provide detailed info but it should be without teaser information and the detailUrl.
	
     /detailedInfo_without_teaser_ByID

### Request
There is one input that is required by the user and that is required to check if the id has visible to true or not.

    { "id":"114"}

### Response
 The response will be a 200OK with the following JSON keys
 - **200-OK** -  the detailed offer will be shared without detailUrl and teaser
 -  **400- Bad Request** -  If id is not given that it will send the error

## Requirement 8
The requirements is to provide fo
     http://localhost:5000/filtered_specific_data

### Request
There are no inputs that are required by the user.

### Response
 The response will be a 200OK with the following JSON keys 
 1. **TotalUsers** 
 2.  **Items** which will be a JSON Array with id, teaser, detailUrl, labels and price information 

