module.exports = {

    url: {
        facebook: 'https://www.facebook.com',
        facebookMinusWWW: 'https://facebook.com',
        facebookDotCom: 'facebook.com',
    },

    loginPage: {
        emailOrPhone: 'input[id="email"]',
        password: 'input[id="pass"]',
        loginButton: 'label[id="loginbutton"]',
        firstName: 'input[name="firstname"]',
        lastName: 'input[name="lastname"]',
        mobileNumberOrEmail: 'input[aria-label="Mobile number or email"]',
        confirmEmail: 'input[name="reg_email_confirmation__"]',
        newPassword: 'input[aria-label="New password"]',
        birthMonth: 'select[id="month"]',
        birthDate: 'select[id="day"]',
        birthYear: 'select[id="year"]',
        sex: 'input[type="radio"]',
        signUp: 'button[type="submit"]',
    },

    failedLogIn: {
        emailOrPhone: 'input[placeholder="Email or Phone Number"]',
        password: 'input[id="pass"]',
        loginButton: 'button[id="loginbutton"]',
    },

failedAttemptWithName: {
    password: 'input[name="pass"]'
}
}