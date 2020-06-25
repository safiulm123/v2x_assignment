
# V2X Network Assingment

  

As a Web or App developer I want to request a (filtered) list of offers and for each offer some more detailed information so that I can process/display this information in the Web or App.

  # Procedure of Installation
  Before running the containers, some prerequisites needs to be fulfilled.
  ## Prerequisites 
  Few things are required before running of the code. Those are 
  

 - Docker
 - Docker-Compose

## Installation  
  All the setup is done in a way that you only need to clone the file from github and run a command.
  
	  git clone https://github.com/safiulm123/v2x_assignment.git && cd v2x_assignment
	  docker-compose up

> I am intentionally not running the container in daemon mode as you would be able to see the whole process of creating a table, loading the data, tests and then running the servers

	  
  

# API Documentation

  

Different kind of filtered APIs are developed so that it is easier to get the required data.

  

## Requirement 1

  

The first requirement is to display list of orders with **visible** set to **true**. The URL to get the information is

  

	http://localhost:5000/filtered_visible

  

### Request

There are no inputs that are required by the user.

  

### Response

- **200-OK** -The response will be a 200OK with a JSON Array. only those lists which has visible set to true
-  **400- Bad Request** - if there is some sort of issue then 400 -Bad Request will be shown with the reason

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


 - **200-OK** -The response will be a 200OK with a JSON Array. It will have a TotalOffers and Item with specific information stated above
-  **400- Bad Request** - if there is some sort of issue then 400 -Bad Request will be shown with the reason


  

## Requirement 3

The requirements is to show list of offers limited to the user input as a number. (e.g. return only 10 offers)

  

	http://localhost:5000/limit_filter

  

### Request

There are some JSON keys that are required by the user. **Limit is a number**

  

{limit: 10}

  

### Response

The response will be a 200-OK with the following JSON keys

 

 - **200-OK** -The response will be a 200OK with a JSON Array.List item
-  **400- Bad Request** - if there is some sort of issue then 400 -Bad Request will be shown with the reason


  

## Requirement 4

 
The requirements are to get a filtered output by 

	 1. Portfolio
	 2. Make one or more (e.g. Opel, Mazda)
	 3. Price (This is suppose to be a range)


    http://localhost:5000/filtered_requested_data
      

### Request

A user input is required to get the correct information.

	{"portfolio": "1000","pricing":{"from": 500,"to": 5000},"make":["Ford","Peugeot","Volkswagen","Porsche"]}
  

### Response

 -  **200-OK** -The response will be a 200OK with the filtered data. It will only have the data of those items that the criteria has been set for

-  **400- Bad Request** - if there is some sort of issue then 400 -Bad Request will be shown with the reason

## Requirement 5

  

The requirement for this API is to display the list of offers in ascending order by price

    http://localhost:5000/sorted_by_price

### Request

There are no inputs that are required by the user.

  

### Response
-  **200-OK** -The response will be a 200OK with a **JSON Array** and all the prices will be in **ascending order**.

-  **400- Bad Request** - If id is not given then it will send the error and provide you with a reason why there is an error


  

## Requirement 6

  

The requirement is to show a detailed offer for which visible is set to true

	http://localhost:5000/detailedInfo_visible_ByID

  

### Request

There is one input that is required by the user and that is required to check if the id has visible to true or not.

  

	{ "id":"114"}

  

### Response

The response will be a 200OK with the following JSON keys

-  **200-OK** - Items with the detailed offer will be shared

-  **400-Bad Request** - If the visible is set to false then it will notify that visible is set to false

  

## Requirement 7

  

The requirements is to provide detailed info but it should be without teaser information and the detailUrl.

	http://localhost:5000/detailedInfo_without_teaser_ByID

  

### Request

There is one input that is required by the user and that is required to check if the id has visible to true or not.

  

	{ "id":"114"}

  

### Response

The response will be a 200OK with the following JSON keys

-  **200-OK** - the detailed offer will be shared without detailUrl and teaser

-  **400- Bad Request** - If id is not given that it will send the error

  

## Requirement 8

The requirements is to provide offer list and detailed offer information is returned as JSON and simplified compared to the low-level DynamoDB format

	http://localhost:5000/unfiltered_data

  

### Request

There are no inputs that are required by the user.

  

### Response

- **200-OK** -The response will be a 200OK with a JSON Array. It will be without type descriptors
-  **400- Bad Request** - if there is some sort of issue then 400 -Bad Request will be shown with the reason