

CREATE TABLE Goods(
    productId INT PRIMARY KEY UNIQUE AUTO_INCREMENT, 
    serialNumber VARCHAR(100), 
    item VARCHAR(100), 
    image VARCHAR(300), 
    category VARCHAR(20), 
    stock INT

);
SELECT * FROM Goods;  



drop table Goods; 
