# Shopify Backend Developer Intern Challenge (Summer 2022)

This is my submission for the Shopify Backend Developer Intern Challenge. It is a simple inventory system with CRUD functionality. For the optional feature, I chose to add filtering/sorting. 

## Demo

<http://ec2-54-197-32-148.compute-1.amazonaws.com/>

## Technologies Used

- Node.js
- Express
- MongoDB
- EJS
- AWS (EC2)

## Usage

- **Create Items:** Items may be created by filling the name, quantity, and (optional) tag fields and then clicking 'Submit'. It will then be added to the database. If an item with the entered name already exists, it will not be added.
- **Delete Items:** Items may be deleted from the database by clicking their respective 'Delete' button on the list.
- **Edit Items:** Items in the database may have their information updated by clicking their respective 'Edit' button on the list. If an item with the entered name already exists, it will not be updated.
- **Filter/Sort Items:** Items may be filtered and sorted by filling the desired information in the fields labelled 'Filter' and 'Sort' and then clicking 'Submit'. Note that the filter will only show items that match the input exactly.
