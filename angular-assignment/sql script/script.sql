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
