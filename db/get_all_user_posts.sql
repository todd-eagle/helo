SELECT p.id, p.title, p.img, p.content, p.author_id, u.username, u.profile_pic
FROM posts p
JOIN users u
ON p.author_id = u.id;