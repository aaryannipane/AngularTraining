create database userAuth

use userAuth

create table [state](id int identity(1,1) primary key, name nvarchar(20))

insert into state (name) values ('maharashtra'), ('karnataka'), ('tamil nadu'), ('gujarat'), ('rajasthan')

select * from state

create table city(id int identity(1,1) primary key, name nvarchar(20), stateId int FOREIGN KEY references state(id))

insert into city(name, stateId) values ('mumbai', 1), ('pune', 1), ('nagpur', 1), ('thane', 1), ('nashik', 1),
('bengaluru', 2), ('mysuru', 2), ('hubli', 2), ('mangalore', 2), ('belgaum', 2),
('chennai', 3), ('coimbatore', 3), ('madurai', 3), ('salem', 3), ('tiruchirappalli', 3),
('ahmedabad', 4), ('surat', 4), ('vadodara', 4), ('rajkot', 4), ('bhavnagar', 4),
('jaipur', 5), ('udaipur', 5), ('jodhpur', 5), ('kota', 5), ('ajmer', 5)

select * from city

create proc spGetState
as
begin
	select * from state
end

create proc spGetCityByStateId
@stateId int
as 
begin
	select * from city where stateId=@stateId
end

spGetCityByStateId 1

create table roles(id int identity(1,1) primary key, name nvarchar(20))
insert roles (name) values ('admin'), ('seller'), ('buyer')
select * from roles


create proc spGetAllRoles
as 
begin
	select * from roles
end

create table users(
	id int identity(1,1) primary key,
	username nvarchar(20) unique not null,
	email nvarchar(20) unique not null,
	firstName nvarchar(20) not null,
	lastName nvarchar(20) not null,
	password nvarchar(20) not null,
	dob DATE not null,
	gender nvarchar(10) not null,
	stateId int foreign key references state(id) not null,
	cityId int foreign key references city(id) not null,
	profileImage nvarchar(max) not null
)

create table userRoles(
id int identity(1,1) primary key, 
userId int foreign key references users(id), 
roleId int foreign key references roles(id), 
)


create type userRoleType AS TABLE ( userId int,  roleId int)



DECLARE @roles userRoleType
insert into @roles values (0,1), (0,2)
DECLARE @isUsernameTaken BIT, @isEmailTaken BIT, @isSuccess BIT
DECLARE @dob DATE = GETDATE()
exec spInsertUser 'aryan2', 'nipane', 'nipanearyan2', 'aryan2@gmail.com', 'aA2@', @dob, 'male', 1,2,'profile.jpg', @roles, @isUsernameTaken OUT, @isEmailTaken OUT, @isSuccess OUT
print @isUsernameTaken
print @isEmailTaken
print @isSuccess

select * from users
select * from userRoles

DBCC CHECKIDENT ('[users]', RESEED, 0);
GO

truncate table userRoles
delete users
sp_help 'users'


go
alter proc spInsertUser
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

go

select * from userRoles
spGetUserByUsernameEmail 'user1'
create proc spGetUserByUsernameEmail
@usernameEmail nvarchar(20)
as
begin
	select A.*, B.name 'state', C.name 'city', E.id, E.name from users as A 
	join state as B ON A.stateId=B.id
	join city as C ON A.cityId=C.id
	join userRoles as D ON A.id = D.userId
	join roles as E ON D.roleId = E.id
	where A.username=@usernameEmail OR A.email=@usernameEmail
end
select * from users
select * from roles

delete userRoles
delete users