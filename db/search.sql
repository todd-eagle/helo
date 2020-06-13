-- SELECT * FROM posts 
-- WHERE LOWER (title)
-- LIKE  LOWER ('%' || $1 || '%')


SELECT p.id, p.title, p.img, p.content, u.username, u.profile_pic
FROM posts p
JOIN users u
ON p.author_id = u.id
WHERE LOWER (p.title)
LIKE  LOWER ('%' || $1 || '%')