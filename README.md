<h1>NO CHEATERS AMONG US</h1>

<h2>Description</h2>
<ul>
<li> Heroku App: https://unsupervised-test.herokuapp.com/ 
<li>The main objective of this project is to provide a secure and interactive platform to conduct and monitor tests. <br>
<li>It is an unsupervised platform wherein login functionality is provided to students and teachers(admin). <br>
<li>The application seeks to provide a solution for the following issues: <br>
  <ol>
   <li>Fraud and Malpractice regulation and detection in an unsupervised manner <br>
   <li>Making monitoring easier and automated <br>
   <li>Making an interactive and simple platform to host and conduct online tests.<br>
   <li>Provide an integrity score report using which students and teachers can both have proof for their respective stances.<br>
 </ol>
</ul>
<br>
<br>
<h2>Table of Contents</h2>
<ul>
<li>Description
<li>Installation
<li>Usage
   <ol>
   <li>Registration
   <li>Login
   <li>Student Side Dashboard
   <li>Teacher Side Dashboard
   <li>Testing Environment
   <li>Integrity Score Report
   </ol>
<li>Dependencies
<li>Credits
</ul>
<br>
<br>
<h2>Installation</h2>
<ul>
<li>Open git bash
<li>Go to the directory you want to store the project in via cd command
<li>`git clone https://github.com/ShabarishRamaswamy/unsupervised-tests`
<li>Open node.js command prompt
<li>Go to the directory where we cloned the repository
<li>`npm install`
<li>npm run dev
<li>Open on http://locahost:portid/ (portid provided in NodeJS CMD)
</ul>
<br>
<br>
<h2>Usage</h2>
<ul>
<li><b>CREATE USER ACCOUNT</b>
<ol>
<li>After Clicking on Create User Account, Fill in all the required fields as per your requirements. 
<li>Make any changes to your values as per the server’s demands
<li>All the field values are stored in accordance with a predefined schema in MongoDB and the password is hashed with JWT for further security.
<li>The Client can register either as a teacher(admin) or a student(test taker)
<li>Once registration is confirmed and completed, user is then redirected to Login/Signup Landing Page and can then proceed to Login
</ol>
 
 <br>
<li><b>LOGIN</b>
<ol>
<li>Once the registration is done, Next step is login.
<li>The application will throw an error in case the user doesn’t exist or isn’t registered prior.
<li>For Logging in, input your registered email address and password and you will then be redirected to the Main dashboard.
</ol>
<br>
<li><b>DASHBOARD</b>
<b>- STUDENT SIDE</b>
<ol>
<li>View Test Analysis: The test analysis or integrity score report is a special feature which tracks fraud and malpractice in the testing environment and then updates a fraudScore variable which will then determine what action needs to be taken against the student.
<li>Join New Test: The student can join new tests according to their choices listed in the registration section. They will be redirected to the testing environment.
</ol>
  <br>
<b>- TEACHER SIDE</b>
<ol>
<li>Create New Test: The teachers are given the option to create new tests for any subject and they can input questions manually to be displayed.
<li>View Test Analysis of All Students: Teachers also have access to the integrity score/ test analysis which they can use to grade students.
 </ol>
 <br>
 
 
<li><b>TESTING ENVIRONMENT</b>
<ol>
<li>The testing environment will be active for a predefined time of 1 hour and will be carrying out the main purpose of this application.
<li>Here, we have deployed our ML models which involve the following functionalities:
<li>Eye-gaze tracking
<li>Facial Detection
<li>Body Detection
<li>Via this we will be able to generate an integrity score which will be further used for teachers and students for their perusal.
<li>The website will also be able to track what keys are pressed, if tabs are switched or if other applications are running simultaneously and the exam will be halted accordingly.
<li>If the camera goes out of focus or is blocked, errors will be thrown and the exam will be halted.
<li>Once the exam is over, the fraud score is fed into the database and then subsequently made available to both teachers and students.	     
</ol>
<br>
<li><b>INTEGRITY SCORE REPORT</b>
<ol>
 <li>All tests attempted can be seen here hence ensuring attendance record.
 <li>Integrity Score of All students can be seen and tracked under this area.
 </ol>
 </ul>
 
 <br>
 <br>
 
<h2>Dependencies</h2> 
<ul>
<li><b>EYE GAZE TRACKING</b>
<ol>
<li>clmtrackr.js
<li>clmtrackr.min.js
<li>p5.min.js
<li>p5.dom.min.js
<li>Basic webcam functionality
<li>Inbuilt-javascript functions for drawing demarcations and calculating flexible value ranges while calculating eye movement
</ol>
<li><b>FACE DETECTION</b>
<ol>
<li>tensorflow.js
<li>face-api.min.js
<li>Live-server testing
 </ol>
<li><b>WEB DEVELOPMENT</b>
<ol>
<li>Expressjs
<li>Mongoosejs
<li>Ejs
<li>Bcrypt
<li>JsonWebToken(JWT)
</ol>
</ul> 
 <br>
 <br>
<h2>Credits</h2>
<h4>RemoteAssmt-2</h4>
<ul>
<li>Shabarish Ramaswamy
<li>Shlok Naik
<li>Abhishek Joshi
<li>Aakriti Sharma
 <ul>

