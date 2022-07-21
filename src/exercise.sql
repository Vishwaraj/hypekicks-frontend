-- ---------first exercise------------------
-- 1)
SELECT title FROM movies

-- 2)
SELECT director FROM movies

-- 3)
SELECT title, director FROM movies

-- 4)
SELECT title, year FROM movies

-- 5) 
SELECT * FROM movies


-- ---------second exercise-----------------

-- 1)
SELECT * FROM movies
WHERE id = 6

-- 2)
SELECT * FROM movies
WHERE year BETWEEN 2000 AND 2010

-- 3)
SELECT * FROM movies
WHERE year NOT BETWEEN 2000 AND 2010

-- 4)
SELECT * FROM movies
WHERE year BETWEEN 1995 AND 2003


-- ---------third exercise-------------------

-- 1)
SELECT * FROM movies
WHERE title LIKE 'Toy%'

-- 2
SELECT * FROM movies
WHERE director LIKE 'John%'

-- 3
SELECT * FROM movies
WHERE director NOT LIKE 'John%'

-- 4
SELECT * FROM movies
WHERE title LIKE 'Wall-_'


-- ----------fourth exercise---------------

-- 1
SELECT DISTINCT director FROM movies
ORDER BY director 


-- 2
SELECT * FROM movies
ORDER BY year DESC
LIMIT 4 

-- 3
SELECT * FROM movies
ORDER BY title ASC
LIMIT 5

-- 4
SELECT * FROM movies
ORDER BY title ASC
LIMIT 5 OFFSET 5


-- ----------fifth exercise----------------

-- 1
SELECT * FROM north_american_cities
WHERE country = 'Canada'

-- 2
SELECT * FROM north_american_cities
WHERE country = 'United States'
ORDER BY latitude DESC

-- 3
SELECT * FROM north_american_cities
WHERE longitude < -87.629798
ORDER BY longitude

-- 4
SELECT * FROM north_american_cities
WHERE country = 'Mexico'
ORDER BY population DESC
LIMIT 2

-- 5
SELECT * FROM north_american_cities
WHERE country = 'United States'
ORDER BY population DESC
LIMIT 2 OFFSET 2


-- ---------sixth exercise------------

-- 1
SELECT * FROM Boxoffice
INNER JOIN movies
ON Id = Movie_id

-- 2
SELECT * FROM Boxoffice
INNER JOIN  movies
ON Id = Movie_id
WHERE Domestic_sales < International_sales

-- 3
SELECT * FROM Boxoffice
INNER JOIN  movies
ON Id = Movie_id
ORDER BY rating DESC

-- -----------seventh exercise-------------


-- 1
SELECT DISTINCT building FROM employees

-- 2
SELECT * FROM Buildings 

-- 3



-- ----------eight exercise-----------------

-- 1
SELECT Name, Role FROM employees
WHERE Building IS NULL

-- 2
SELECT * FROM Buildings
LEFT JOIN  employees
ON Building_name = Building
WHERE building IS NULL

-- ---------Ninth exercise------------------

-- 1
SELECT title, (Domestic_sales + International_sales) / 1000000 AS gross_sales_millions from Movies
JOIN Boxoffice
ON id = movie_id

-- 2
SELECT title, (rating * 10) AS ratings_in_percentage from Movies
JOIN Boxoffice
ON id = movie_id

-- 3
SELECT title, year from Movies
JOIN Boxoffice
ON id = movie_id
WHERE ABS(year) % 2 = 0


------------ Tenth exercise---------------



















