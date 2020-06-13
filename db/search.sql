-- SELECT * FROM posts 
-- WHERE LOWER (title) 
-- LIKE LOWER (%$1%)

SELECT * FROM posts 
WHERE LOWER (title)
LIKE  LOWER ('%' || $1 || '%')