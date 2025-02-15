-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.

select
productname, categoryname
from product as p
join category as c
on p.categoryid = c.id

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.

--THE DB IS BROKEN, SO THIS DOESN'T WORK I GUESS
select
o.id as order_id, s.companyname
from [order] as o
join shipper as s
on o.shipvia = s.id
where o.orderdate < date('2012-08-09')

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.

select
p.productname, od.quantity
FROM orderdetail as od
join product as p
on od.productid = p.id
where od.orderid = 10251
order by p.productname

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.

select
o.id as order_id, c.companyname as company_name, e.lastname as employee_last_name
from [order] as o
join customer as c
on c.id = o.customerid
join employee as e
on e.id = o.employeeid