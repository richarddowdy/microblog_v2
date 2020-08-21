# Microblog

Microblog is an anonymous blogging app that allows users to create blog posts and create comments on any post. 

This CRUD app follows the RESTful routing architecture.

### Posts
* ```GET => api/posts``` - Returns a list of all posts.
* ```GET => api/posts/:id``` - Returns all the specific details about a certain post specified by its :id.
* ```POST => /posts/``` - Creates a post and returns its details from the db.
* ```PUT => /posts/:id``` - Edits an already existing post as specified by the post's :id.
* ```DELETE => /posts/:id``` - Deletes a specific post as specified by its :id.



### Comments
* ```GET => api/posts/:id/comments``` - Returns a list all comments associated with a post as specified by the post's :id.
* ```POST => /posts/:id/comments``` - Creates a comment and returns its details from the db.
* ```DELETE => /posts/:id/comments/:id``` - Deletes a specific comment as specified by its :id.