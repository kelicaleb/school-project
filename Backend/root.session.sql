SHOW DATABASES;

USE Products;
SHOW TABLES; 
CREATE TABLE Customer(
    customerId INT PRIMARY KEY AUTO_INCREMENT, 
    email VARCHAR(100), 
    username VARCHAR(30), 
    password VARCHAR(200), 
    phoneNumber VARCHAR(20), 
    dob DATE, 
    gender VARCHAR(10), 
    theme VARCHAR(10)

) ;
SELECT * FROM Customer; 
ALTER TABLE Customer 
ADD COLUMN theme VARCHAR(10);
DROP TABLE Customer; 
DELETE FROM Purchased; 
DELETE FROM Cart;
DELETE FROM Customer; 
SELECT * FROM Purchased;

DELETE FROM Customer
WHERE customerId = 4;
