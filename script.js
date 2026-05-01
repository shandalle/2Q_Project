// Form validation function
function validateForm() {
    // Reset all error messages
    clearErrors();
    
    // Get form values
    let fullName = document.getElementById('fullName').value;
    let birthdate = document.getElementById('birthdate').value;
    let sex = document.querySelector('input[name="sex"]:checked');
    let email = document.getElementById('email').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    let issueSelect = document.getElementById('issueSelect').value;
    let interests = document.querySelectorAll('input[name="interests"]:checked');
    let volunteer = document.querySelector('input[name="volunteer"]:checked');
    
    let isValid = true;
    
    // Validate Full Name
    if (fullName.trim() === '') {
        showError('nameError', 'Please enter your full name');
        isValid = false;
    } else if (fullName.trim().length < 3) {
        showError('nameError', 'Name must be at least 3 characters long');
        isValid = false;
    }
    
    // Validate Birthdate
    if (birthdate === '') {
        showError('birthError', 'Please enter your birthdate');
        isValid = false;
    } else {
        let age = calculateAge(birthdate);
        if (age < 13) {
            showError('birthError', 'You must be at least 13 years old to sign up');
            isValid = false;
        } else if (age > 120) {
            showError('birthError', 'Please enter a valid birthdate');
            isValid = false;
        }
    }
    
    // Validate Sex
    if (!sex) {
        showError('sexError', 'Please select your gender');
        isValid = false;
    }
    
    // Validate Email
    if (email.trim() === '') {
        showError('emailError', 'Please enter your email address');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('emailError', 'Please enter a valid email address (e.g., name@example.com)');
        isValid = false;
    }
    
    // Validate Username
    if (username.trim() === '') {
        showError('userError', 'Please choose a username');
        isValid = false;
    } else if (username.trim().length < 4) {
        showError('userError', 'Username must be at least 4 characters long');
        isValid = false;
    } else if (!/^[a-zA-Z0-9._]+$/.test(username)) {
        showError('userError', 'Username can only contain letters, numbers, dots, and underscores');
        isValid = false;
    }
    
    // Validate Password
    if (password === '') {
        showError('passError', 'Please enter a password');
        isValid = false;
    } else if (password.length < 8) {
        showError('passError', 'Password must be at least 8 characters long');
        isValid = false;
    } else if (!isStrongPassword(password)) {
        showError('passError', 'Password must contain at least one uppercase letter, one lowercase letter, and one number');
        isValid = false;
    }
    
    // Validate Confirm Password
    if (confirmPassword === '') {
        showError('confirmError', 'Please confirm your password');
        isValid = false;
    } else if (password !== confirmPassword) {
        showError('confirmError', 'Passwords do not match');
        isValid = false;
    }
    
    // Validate Issue Select
    if (issueSelect === '') {
        showError('issueError', 'Please select your main environmental concern');
        isValid = false;
    }
    
    // Validate Interests (at least one)
    if (interests.length === 0) {
        showError('interestError', 'Please select at least one advocacy interest');
        isValid = false;
    }
    
    // Validate Volunteer Frequency
    if (!volunteer) {
        showError('volunteerError', 'Please select how often you volunteer');
        isValid = false;
    }
    
    // If all validations pass
    if (isValid) {
        showSuccessMessage();
        return false; // Prevent actual form submission for demo
    }
    
    return false; // Prevent form submission
}

// Helper function to show error messages
function showError(elementId, message) {
    let errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.color = '#d32f2f';
        
        // Add red border to the corresponding input
        let inputId = elementId.replace('Error', '');
        let inputElement = document.getElementById(inputId);
        if (inputElement) {
            inputElement.style.borderColor = '#d32f2f';
            
            // Remove red border when user starts typing
            inputElement.addEventListener('input', function() {
                this.style.borderColor = '#e0e0e0';
                let error = document.getElementById(elementId);
                if (error) error.textContent = '';
            });
        }
    }
}

// Helper function to clear all error messages
function clearErrors() {
    let errors = document.querySelectorAll('.error');
    errors.forEach(error => {
        error.textContent = '';
    });
    
    // Reset all input borders
    let inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.style.borderColor = '#e0e0e0';
    });
}

// Calculate age from birthdate
function calculateAge(birthdate) {
    let today = new Date();
    let birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    let monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// Validate email format
function isValidEmail(email) {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate password strength
function isStrongPassword(password) {
    let hasUpperCase = /[A-Z]/.test(password);
    let hasLowerCase = /[a-z]/.test(password);
    let hasNumbers = /[0-9]/.test(password);
    return hasUpperCase && hasLowerCase && hasNumbers;
}

// Show success message
function showSuccessMessage() {
    let successMessage = document.getElementById('successMessage');
    
    // Get form data for success message
    let fullName = document.getElementById('fullName').value;
    let interests = document.querySelectorAll('input[name="interests"]:checked');
    let interestList = Array.from(interests).map(i => i.value).join(', ');
    
    successMessage.innerHTML = `✨ Thank you ${fullName.split(' ')[0]}! ✨<br>
                                You've successfully joined Green Future PH with interests in: ${interestList}<br>
                                🌍 Welcome to the community! 🌱`;
    successMessage.style.display = 'block';
    successMessage.style.background = '#e8f5e9';
    successMessage.style.padding = '15px';
    successMessage.style.borderRadius = '8px';
    successMessage.style.marginTop = '20px';
    document.getElementById('signupForm').reset()
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000);
}

// Real-time validation
document.addEventListener('DOMContentLoaded', function() {
    // Add real-time validation for password match
    let password = document.getElementById('password');
    let confirmPassword = document.getElementById('confirmPassword');
    
    if (confirmPassword) {
        confirmPassword.addEventListener('input', function() {
            if (password.value !== this.value) {
                document.getElementById('confirmError').textContent = 'Passwords do not match';
            } else {
                document.getElementById('confirmError').textContent = '';
            }
        });
    }
    
    // Add real-time username validation
    let username = document.getElementById('username');
    if (username) {
        username.addEventListener('input', function() {
            if (this.value.length > 0 && this.value.length < 4) {
                document.getElementById('userError').textContent = 'Username must be at least 4 characters';
            } else {
                document.getElementById('userError').textContent = '';
            }
        });
    }
    
    // Add real-time password strength indicator
    if (password) {
        password.addEventListener('input', function() {
            let passError = document.getElementById('passError');
            if (this.value.length > 0 && this.value.length < 8) {
                passError.textContent = 'Password must be at least 8 characters';
                passError.style.color = '#ff9800';
            } else if (this.value.length >= 8 && !isStrongPassword(this.value)) {
                passError.textContent = 'Add uppercase, lowercase, and numbers for a strong password';
                passError.style.color = '#ff9800';
            } else if (this.value.length >= 8 && isStrongPassword(this.value)) {
                passError.textContent = '✓ Strong password!';
                passError.style.color = '#2e7d32';
            } else {
                passError.textContent = '';
            }
        });
    }
});
