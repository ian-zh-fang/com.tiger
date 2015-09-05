CREATE TABLE [dbo].[ArticleFile]
(
	[Id] BIGINT NOT NULL IDENTITY(1,1), 
    [Code] NCHAR(19)  NOT NULL PRIMARY KEY, 
    [Name] NVARCHAR(100) NULL, 
    [Title] NVARCHAR(50) NULL, 
    [Desc] NVARCHAR(200) NULL, 
    [Mime] VARCHAR(30) NULL, 
    [Category] INT NULL, 
    [Articlecode] NCHAR(19) NULL DEFAULT '0000000000000000000' , 
    [Createdatetime] DATETIME NULL DEFAULT GETDATE()

)
