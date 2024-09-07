# MERN Stack Blog Application

## Overview

This application is a full-stack blog built using the MERN stack, which includes MongoDB, ExpressJS, React, and Node.js. It allows users to create and manage blog posts, register and log in, and interact with posts through comments and views.

## Key Features

1. **User Registration and Authentication:**
   - Users can register an account by providing a username and password.
   - After registration, users can log in to access additional functionalities.

2. **Post Management:**
   - Registered users can create and publish blog posts.
   - Posts include a title, text, and an optional image upload.
   - Each post displays the author's name, creation date, title, and a preview of the text.

3. **Post Interaction:**
   - Users can view the full text of a post by clicking on it.
   - Each post has a view count that updates as users visit the article.
   - Users can leave comments on posts, which are displayed below the article with basic avatars (initials).

4. **Ownership and Permissions:**
   - Users can only edit or delete their own posts.
   - Non-authors cannot modify or delete posts created by others.
   - Editing allows users to update the post title or content, and deleting removes the post from the blog.

5. **Admin and Statistics:**
   - The application tracks and displays the number of views and comments for each post.
   - Popular posts are shown, with a limit on the number displayed.

## How It Works

1. **Opening the App:**
   - Users see the homepage with a list of posts. If the database is empty, the page will be clean.

2. **Registering and Logging In:**
   - Click on "Login" to access the registration and login forms.
   - Register with a username, password, and other details.
   - After successful registration, a menu with options appears.

3. **Adding a Post:**
   - Use the "Add an article" form to upload a post with an image, title, and text.
   - After adding, the post appears on the main page and under "My Articles" (currently with some issues).

4. **Viewing and Commenting:**
   - Posts can be viewed by clicking on them, displaying full text and comments.
   - Comments can be added to posts, with statistics on the number of comments and views.

5. **Managing Posts:**
   - Users can edit or delete their own posts using the respective buttons.
   - Editing allows for updates to the title or content.
   - Deleted posts are removed from view.

## Current Status

- The application is still under development.
- The "My Posts" section requires adjustments, but the core functionalities work as intended.
- Users cannot edit or delete others' posts, but they can read comments and view statistics.

## Technologies Used

- **Frontend:** React
- **Backend:** Node.js, ExpressJS
- **Database:** MongoDB

Feel free to explore and provide feedback as we continue to improve the application!
