USE [master]
GO
/****** Object:  Database [userAuth]    Script Date: 10/31/2024 5:17:25 PM ******/
CREATE DATABASE [userAuth]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'userAuth', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\userAuth.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'userAuth_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\userAuth_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [userAuth] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [userAuth].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [userAuth] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [userAuth] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [userAuth] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [userAuth] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [userAuth] SET ARITHABORT OFF 
GO
ALTER DATABASE [userAuth] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [userAuth] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [userAuth] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [userAuth] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [userAuth] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [userAuth] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [userAuth] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [userAuth] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [userAuth] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [userAuth] SET  ENABLE_BROKER 
GO
ALTER DATABASE [userAuth] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [userAuth] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [userAuth] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [userAuth] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [userAuth] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [userAuth] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [userAuth] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [userAuth] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [userAuth] SET  MULTI_USER 
GO
ALTER DATABASE [userAuth] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [userAuth] SET DB_CHAINING OFF 
GO
ALTER DATABASE [userAuth] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [userAuth] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [userAuth] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [userAuth] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [userAuth] SET QUERY_STORE = ON
GO
ALTER DATABASE [userAuth] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [userAuth]
GO
/****** Object:  UserDefinedTableType [dbo].[userRoleType]    Script Date: 10/31/2024 5:17:26 PM ******/
CREATE TYPE [dbo].[userRoleType] AS TABLE(
	[userId] [int] NULL,
	[roleId] [int] NULL
)
GO
/****** Object:  Table [dbo].[city]    Script Date: 10/31/2024 5:17:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[city](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](20) NULL,
	[stateId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[roles]    Script Date: 10/31/2024 5:17:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[roles](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](20) NULL,
 CONSTRAINT [PK_role_roleId] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[state]    Script Date: 10/31/2024 5:17:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[state](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[userRoles]    Script Date: 10/31/2024 5:17:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[userRoles](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userId] [int] NULL,
	[roleId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[users]    Script Date: 10/31/2024 5:17:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [nvarchar](20) NOT NULL,
	[email] [nvarchar](20) NOT NULL,
	[firstName] [nvarchar](20) NOT NULL,
	[lastName] [nvarchar](20) NOT NULL,
	[password] [nvarchar](20) NOT NULL,
	[dob] [date] NOT NULL,
	[gender] [nvarchar](10) NOT NULL,
	[stateId] [int] NOT NULL,
	[cityId] [int] NOT NULL,
	[profileImage] [nvarchar](max) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[city]  WITH CHECK ADD FOREIGN KEY([stateId])
REFERENCES [dbo].[state] ([id])
GO
ALTER TABLE [dbo].[userRoles]  WITH CHECK ADD FOREIGN KEY([roleId])
REFERENCES [dbo].[roles] ([id])
GO
ALTER TABLE [dbo].[userRoles]  WITH CHECK ADD FOREIGN KEY([userId])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[users]  WITH CHECK ADD FOREIGN KEY([cityId])
REFERENCES [dbo].[city] ([id])
GO
ALTER TABLE [dbo].[users]  WITH CHECK ADD FOREIGN KEY([stateId])
REFERENCES [dbo].[state] ([id])
GO
/****** Object:  StoredProcedure [dbo].[spGetAllRoles]    Script Date: 10/31/2024 5:17:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[spGetAllRoles]
as 
begin
	select * from roles
end
GO
/****** Object:  StoredProcedure [dbo].[spGetCityByStateId]    Script Date: 10/31/2024 5:17:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[spGetCityByStateId]
@stateId int
as 
begin
	select * from city where stateId=@stateId
end
GO
/****** Object:  StoredProcedure [dbo].[spGetState]    Script Date: 10/31/2024 5:17:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[spGetState]
as
begin
	select * from state
end
GO
/****** Object:  StoredProcedure [dbo].[spInsertUser]    Script Date: 10/31/2024 5:17:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[spInsertUser]
@firstname nvarchar(20),
@lastname nvarchar(20),
@username nvarchar(20),
@email nvarchar(20),
@password nvarchar(20),
@dob DATE,
@gender nvarchar(10),
@stateId int,
@cityId int,
@profileImage nvarchar(max),
@roles userRoleType READONLY,
@isUsernameDuplicate BIT OUTPUT,
@isEmailDuplicate BIT OUTPUT,
@isSuccess BIT OUTPUT
as
begin
	SET @isUsernameDuplicate = 0
	SET @isEmailDuplicate = 0
	SET @isSuccess = 0

	BEGIN TRANSACTION
	BEGIN TRY 
		-- check for username exist
		select @isUsernameDuplicate=1 from users where username=@username
		-- check for email exist
		select @isEmailDuplicate=1 from users where email=@email

		IF @isUsernameDuplicate = 0 AND @isEmailDuplicate = 0
		BEGIN
			insert into users (firstName ,lastName,username,email,[password] ,dob ,gender ,stateId ,cityId ,profileImage) 
			values (@firstname, @lastname, @username, @email, @password, @dob, @gender, @stateId, @cityId, @profileImage)
			
			DECLARE @userId int = SCOPE_IDENTITY()

			DECLARE @userRoleTBL userRoleType

			insert into @userRoleTBL 
			select * from @roles

			update @userRoleTBL SET userId=@userId

			insert into userRoles (userId, roleId)
			select userId, roleId from @userRoleTBL 
		END

		SET @isSuccess = 1
		COMMIT
	END TRY 
	BEGIN CATCH 
		SET @isSuccess = 0
		rollback
	END CATCH 
end

GO
USE [master]
GO
ALTER DATABASE [userAuth] SET  READ_WRITE 
GO
