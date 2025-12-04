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

mysql -u root -p
api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=4a0d668f0144faa819aecd199c7ba893

api.openweathermap.org/data/2.5/weather?q=Manchester,uk&APPID=4a0d668f0144faa819aecd199c7ba893


As you can see in my api file that a search term, price range and sort opiton have been added to enhance my web app fe