CREATE DATABASE users
GO

USE users
GO

CREATE TABLE dbo.roles(
	id int PRIMARY KEY IDENTITY(1,1),
	rolev varchar(50) 
)
GO

INSERT dbo.roles(rolev) VALUES('admin') 
GO
INSERT dbo.roles(rolev) VALUES('operator') 
GO


CREATE TABLE users(
	id int PRIMARY KEY IDENTITY(1,1),
	userName varchar(50) ,
	[password] varchar(50) ,
	roleId int ,
	CONSTRAINT fk_roleId FOREIGN KEY (roleId) REFERENCES roles(id)
)
GO

INSERT dbo.users (userName,[password],roleId) VALUES('admin','admin',1) 
GO

CREATE UNIQUE INDEX roleIndex ON dbo.roles (id)
GO
CREATE UNIQUE INDEX userIndex ON dbo.users (id)
GO