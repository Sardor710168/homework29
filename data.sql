CREATE TABLE users (
    id VARCHAR(50) PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    address VARCHAR(255)
);

CREATE TABLE posts (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    slug VARCHAR(200) UNIQUE,
    user_id VARCHAR(50),
    CONSTRAINT fk_posts_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE comments (
    id VARCHAR(50) PRIMARY KEY,
    content TEXT NOT NULL,
    post_id VARCHAR(50),
    user_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_comments_post FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    CONSTRAINT fk_comments_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
