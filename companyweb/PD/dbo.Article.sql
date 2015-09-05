CREATE TABLE [dbo].[Article]
(
	[Id] BIGINT NOT NULL PRIMARY KEY identity(1, 1), 
    [Code] NCHAR(19) NOT NULL Primary key,
	[Title] nvarchar(100), 
    [Createtime] DATETIME NULL, 
    [Updatetime] DATETIME NULL, 
    [Publishtime] DATETIME NULL, 
    [Authorcode] NCHAR(19) NULL, 
    [Author] NVARCHAR(12) NULL, 
    [Publishstatus] INT NULL, 
    [Publishtext] NVARCHAR(20) NULL, 
    [Auditorcode] NCHAR(19) NULL, 
    [Auditor] NVARCHAR(12) NULL, 
    [Auditortime] DATETIME NULL, 
    [Thumbnail] NCHAR(19) NULL, 
    [Topflag] INT NULL, 
    [Toppicture] NCHAR(19) NULL, 
    [Tickcount] BIGINT NULL, 
    [Tag] INT NULL, 
    [Contenteditor] NTEXT NULL, 
    [Category] NVARCHAR(20) NULL, 
    [Authenticstatus] NCHAR(10) NULL
)
