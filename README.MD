# RESTful API to process expenses and incomes data

GET /items : Get all incomes and expenses
POST /items/ : Create a new item ( Income or Expense)
GET /items/:itemid : GET an item with a specific ID
PUT /items/:itemid : Modify an existing item of create a new item
DELETE /items/:itemid : Delete an item

GET /totals: Get total expenses and incomes
GET /totals/:type : Get total income or expense base on type

