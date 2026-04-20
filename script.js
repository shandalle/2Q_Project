function highlight(field){
field.style.border="2px solid green";
}

function unhighlight(field){
field.style.border="1px solid #ccc";
}

function calculateAge(){
// Event handler requirement satisfied via onchange
}

function validateForm(){

// CLEAR ALL ERRORS + SUCCESS MESSAGE

document.getElementById("nameError").innerHTML="";
document.getElementById("birthError").innerHTML="";
document.getElementById("sexError").innerHTML="";
document.getElementById("emailError").innerHTML="";
document.getElementById("userError").innerHTML="";
document.getElementById("passError").innerHTML="";
document.getElementById("confirmError").innerHTML="";
document.getElementById("issueError").innerHTML="";
document.getElementById("interestError").innerHTML="";
document.getElementById("volunteerError").innerHTML="";
document.getElementById("successMessage").innerHTML="";

let isValid=true;

// =========================
// PERSONAL INFORMATION
// =========================

let fullName=document.getElementById("fullName").value.trim();
let birthdate=document.getElementById("birthdate").value;
let email=document.getElementById("email").value.trim();

// Name validation
if(fullName.length<2){
document.getElementById("nameError").innerHTML=
"Full name must be at least 2 characters.";
isValid=false;
}

// Age validation (13+)
if(birthdate===""){
document.getElementById("birthError").innerHTML=
"Birthdate is required.";
isValid=false;
}

if(birthdate!==""){
let today=new Date();
let birth=new Date(birthdate);
let age=today.getFullYear()-birth.getFullYear();
let m=today.getMonth()-birth.getMonth();

if(m<0||(m===0&&today.getDate()<birth.getDate())){
age--;
}

if(age<13){
document.getElementById("birthError").innerHTML=
"You must be at least 13 years old.";
isValid=false;
}
}

// RADIO BUTTON LOOP
let sexOptions=document.getElementsByName("sex");
let sexChosen=false;

for(let i=0;i<sexOptions.length;i++){
if(sexOptions[i].checked){
sexChosen=true;
}
}

if(!sexChosen){
document.getElementById("sexError").innerHTML=
"Please select your sex.";
isValid=false;
}

// Email validation
if(email===""){
document.getElementById("emailError").innerHTML=
"Email is required.";
isValid=false;
}

if(email!=="" && (!email.includes("@") || !email.includes("."))){
document.getElementById("emailError").innerHTML=
"Email must contain @ and a valid domain.";
isValid=false;
}

// =========================
// ACCOUNT DETAILS
// =========================

let username=document.getElementById("username").value.trim();
let password=document.getElementById("password").value;
let confirmPassword=document.getElementById("confirmPassword").value;

const lettersAndNumbers=/^[a-zA-Z0-9]+$/;

// Username length check
if(username.length<8||username.length>20){
document.getElementById("userError").innerHTML=
"Username must be 8–20 characters.";
isValid=false;
}

// Username character rule
if(username!=="" && !lettersAndNumbers.test(username)){
document.getElementById("userError").innerHTML=
"Username may only contain letters and numbers.";
isValid=false;
}

// Password length
if(password.length<10){
document.getElementById("passError").innerHTML=
"Password must be at least 10 characters.";
isValid=false;
}

// Uppercase rule
if(!/[A-Z]/.test(password)){
document.getElementById("passError").innerHTML +=
" Needs uppercase.";
isValid=false;
}

// Lowercase rule
if(!/[a-z]/.test(password)){
document.getElementById("passError").innerHTML +=
" Needs lowercase.";
isValid=false;
}

// Digit rule
if(!/[0-9]/.test(password)){
document.getElementById("passError").innerHTML +=
" Needs a number.";
isValid=false;
}

// Confirm password match
if(confirmPassword!==password){
document.getElementById("confirmError").innerHTML=
"Passwords must match exactly.";
isValid=false;
}

// =========================
// TOPIC QUESTIONS
// =========================

let issue=document.getElementById("issueSelect").value;

if(issue===""){
document.getElementById("issueError").innerHTML=
"Please choose an environmental issue.";
isValid=false;
}

// CHECKBOX LOOP
let interests=document.getElementsByName("interests");
let interestChosen=false;

for(let i=0;i<interests.length;i++){
if(interests[i].checked){
interestChosen=true;
}
}

if(!interestChosen){
document.getElementById("interestError").innerHTML=
"Select at least one advocacy interest.";
isValid=false;
}

// THIRD QUESTION LOOP
let volunteer=document.getElementsByName("volunteer");
let volunteerChosen=false;

for(let i=0;i<volunteer.length;i++){
if(volunteer[i].checked){
volunteerChosen=true;
}
}

if(!volunteerChosen){
document.getElementById("volunteerError").innerHTML=
"Choose how often you volunteer.";
isValid=false;
}

// SUCCESS MESSAGE
if(isValid){
document.getElementById("successMessage").innerHTML=
"Signup successful! Welcome to EcoTrack!";
}

return isValid;
}