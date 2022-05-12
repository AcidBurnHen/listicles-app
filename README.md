# Listicles App

Listicles App is being built using Next.js, Prisma and PostgreSQL.

## Todo

### - Create admin dashboard

- Make a design for the admin dashboard

  #### - Permissions/roles for admin users

  - Author
    - Create Draft
    - Delete Draft if is author
    - Set draft as pending review
  - Editor
    - Delete other users posts
    - Edit other users posts
    - Create category
    - Set all post states
  - Admin
    - Add/delete admin user
    - Set/remove admin user role

  #### - Admin Sections and Functionalities:

  - Posts

  - Pages
    - Posts
      - View all posts
      - Search posts
    - New Post
      - Rich text editor using Editor.js
      - CRUD Operations to manage posts from the DB
  - Post states

    - Draft
    - Pending Review
    - Approved
    - Scheduled
    - Published

  - Listicles

  - Pages
    - List Items
    - Add New Item
      - Custom text editor for various required fields
      - Use gallery component to asociate image with the list item
      - CRUD operations to manage list items in the DB
  - Listicles Component
    - Listicles block component for text editor
    - Search list items by filter and keywords
    - Add list to post with all required List item info
    - Add author review field
  - Required Fields:
    - Category
    - Title
    - Alt Title
    - Genres
    - Synopsis
    - Score
  - Optional Fields:
    - ...

  #### - Reviews

  - Pages

    - Reviews (latest from users)
      - View reviews from users
      - Reviews are related to list items
    - Spam?

      - Spam protection for user reviews
      - Add hidden flag to user account for admin user to review
      - Sort latest spammed messages here as hidden flags
      - Ability to remove flags and "trust" a user so they don't get spammed (used in rare occasions)

      #### - Comments

  - Pages

    - Comments (latest from users)
      - View comments from users
      - Comments are related to posts
    - Spam?
      - Spam protection for user comments
      - Add hidden flag to user account for admin user to review
      - Sort latest spammed messages here as hidden flags
      - Ability to remove flags and "trust" a user so they don't get spammed (used in rare occasions)

  - Genres:
    [ACTION
    ADVENTURE
    COMEDY
    DRAMA
    ECCHI
    FANTASY
    HAREM
    HORROR
    HISTORICAL
    ISEKAI
    JOSEI
    KIDS
    MAGIC
    MARTIAL_ARTS
    MILITARY
    MECHA
    MUSIC
    MYSTERY
    PARODY
    POLICE
    POST_APOCALYPSE
    PSYCHOLOGICAL
    REVERSE_HAREM
    ROMANCE
    SEINEN
    SHOUNEN
    SHOUNEN_AI
    SHOUJO
    SHOUJO_AI
    SCHOOL
    SCI_FI
    SLICE_OF_LIFE
    SPACE
    SPORTS
    SUPER_POWER
    TRAGEDY
    THRILLER
    VAMPIRE
    YURI
    YAOI]

  - Pages

    - Categories
      - View all categories
      - Search categories
    - New Category
      - CRUD operations to manage categories from the DB

  - Gallery

  - Pages
    - Images
      - Retreive images from CDN or db to view the gallery images
      - Search the gallery
    - Add Image
      - Post images to a CDN or db
      - Input fields for title, alt and caption of image.
      - Delete image from the cdn or db.
  - Gallery component
    - Gallery block component for rich text editor
    - Add/remove images inside of editor
    - Search images

### - Create frontend/user dashboard on the public routes

- Make a design for the frontend/user dashboard

#### - Home page:

    - ...
