# Berties Books

Sample code for Dynamic Web Applications module.

Uses node.js with Express and EJS.

To install and run:

npm install
node index.js

run on vm browser e.g. https://doc.gold.ac.uk/usr/398/


i created a .env file to store creds without exposing on git thanks.

i sanitised first name, last name, username, and email for the register form, email again for thw login form and the name and price of the ebook form and the search input. I have sanitised these do remove danger with script tags.

I have purposley not sanitised the passwords as it would break hashing.