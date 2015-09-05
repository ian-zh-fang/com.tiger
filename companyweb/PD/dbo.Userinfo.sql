CREATE TABLE [dbo].[Userinfo]
(
	[Id] INT NOT NULL IDENTITY(1,1), 
    [Code] NCHAR(19) NOT NULL PRIMARY KEY, 
    [username] VARCHAR(32) NULL, 
    [password] VARCHAR(32) NULL, 
    [authenticcategory] VARCHAR(20) NULL, 
    [name] VARCHAR(12) NULL, 
    [category] INT NULL DEFAULT 3, 
    [enable] INT NULL DEFAULT 1, 
    [createdatetime] DATETIME NULL DEFAULT GETDATE()
)
