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
SHOW TABLES; 
SELECT * FROM Login; 
ALTER TABLE Login 
ADD COLUMN phonrNumber VARCHAR(20);
DELETE FROM Login; 
ALTER TABLE Login 
DROP COLUMN admin;
DROP TABLE Login;
CREATE TABLE Login 
(
    loginId INT PRIMARY KEY AUTO_INCREMENT, 
    gender VARCHAR(10), 
    username VARCHAR(20),
    phoneNumber VARCHAR(20)
); 
DELETE FROM Purchased;
ALTER TABLE Purchased
DROP COLUMN phoneNumber;
SELECT * FROM Customer; 
DELETE FROM Customer;
ALTER TABLE Customer
MODIFY COLUMN password VARCHAR(200) NOT NULL;  
SHOW DATABASES; 
CREATE TABLE Admin(
    adminId INT PRIMARY KEY UNIQUE AUTO_INCREMENT, 
    username VARCHAR(20) UNIQUE,
    password VARCHAR(200) 
);

DROP TABLE Admin;
SHOW TABLES;
SELECT * FROM transactions; 
DELETE FROM transactions;
ALTER TABLE transactions
DROP COLUMN purchaseId; 
SELECT * FROM Customer
INNER JOIN transactions ON Customer.customerId = transactions.customerId;

DROP TABLE transactions;
CREATE TABLE transactions(
    transactionId INT UNIQUE AUTO_INCREMENT, 
    customerId INT,
    amount INT,
    item VARCHAR(20), 
    method VARCHAR(20), 
    status VARCHAR(20) DEFAULT "Pending", 
    FOREIGN KEY (customerId ) REFERENCES Customer(customerId)
);
SELECT * FROM transactions;
ALTER TABLE Login 
ADD COLUMN customerId INT; 
SELECT * FROM Login; 
DROP TABLE Login; 
SELECT transactionId, username, item, amount, method, status FROM Customer
LEFT JOIN transactions ON Customer.customerId = transactions.customerId;
SELECT * FROM Customer;
DELETE FROM transactions;
DELETE FROM Login;
DELETE FROM Customer;
DELETE FROM Login;