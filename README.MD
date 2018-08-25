# RESTful API to process expenses and incomes data

## Authentication and Authorization API Methods
### Register or signup with a new user
POST /user/signup

### Generate a Login token
POST /user/login

### Delete an existing user
DELETE /user/:userID

## Items API
### Get Get all incomes and expenses 
GET /items

### Create a new item ( Income or Expense)
POST /items/

### GET an item with a specific ID
GET /items/:itemid

### Modify an existing item of create a new item
PUT /items/:itemid

### Delete an item
DELETE /items/:itemid

## Calculation API methods
### Get all total expenses and incomes
GET /totals

### Get total income or expense base on type
GET /totals/:type

### get available budget
GET /budget

