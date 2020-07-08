DROP DATABASE IF EXISTS "microblog";

CREATE DATABASE "microblog";

\c "microblog"

CREATE TABLE users (id SERIAL PRIMARY KEY,
                    username TEXT NOT NULL,
                    password TEXT NOT NULL,
                    is_admin BOOLEAN NOT NULL DEFAULT 'false');

CREATE TABLE posts (id SERIAL PRIMARY KEY, 
                    title TEXT NOT NULL, 
                    description TEXT NOT NULL,
                    body TEXT, 
                    votes INT NOT NULL DEFAULT 0,
                    user_id INT NOT NULL REFERENCES users ON DELETE CASCADE);
                    
CREATE TABLE comments (id SERIAL PRIMARY KEY, 
                       text TEXT NOT NULL, 
                       post_id INT NOT NULL REFERENCES posts ON DELETE CASCADE,
                       user_id INT NOT NULL REFERENCES users ON DELETE CASCADE);



INSERT INTO users (username, password, is_admin) VALUES
    ('admin', '$2a$12$SmFQcI.5cZsUKSdc3t.3d.o.dlzgts9Wwiig1p8l7Qoe35YHkIrKG', true),
    ('user', '$2a$12$/FTSkojdK6VhZbNtoUgVwOtmIObAhbKd9nhz7oJ5UEeXGcYIagPwC', false);

INSERT INTO posts (title, description, body, user_id) VALUES
    ('First Post', 'Best post ever!', 'Everyone loves posting first. I win!', 1),
    ('Second Post', 'A very good post!', 'Oh well. Didn''t get to be first.', 2);

INSERT INTO comments (text, post_id, user_id) VALUES
    ('This is a really great post.', 1, 1),
    ('Wow! So informative. Thank you so much for the info.', 1, 1),
    ('Great stuff.', 1, 1),
    ('I learned so much reading this.', 1, 2),
    ('This post deserves another upvote..', 1, 1);
