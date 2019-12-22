const selectors = require('../support/selectors')

//This test should not pass but it is. 1908 was a leap year but FB is not accounting for that.
describe('Login Page', function () {
    it('Leap Year', function () {
        cy.visitWebsite(selectors.url.facebook)
        cy.get(selectors.loginPage.firstName).type('Jimmy')
        cy.get(selectors.loginPage.lastName).type('Stewart')
        cy.get(selectors.loginPage.mobileNumberOrEmail).type('+14798689762')
        cy.get(selectors.loginPage.newPassword).type('something secure')
        cy.selectMonth('2')
        cy.selectDate('30')
        cy.selectYear('1908')
        cy.get(selectors.loginPage.sex).eq(1).check()
    })

    it('Input Error State', function () {
        cy.visitWebsite(selectors.url.facebookMinusWWW)
        cy.get(selectors.loginPage.firstName).click()
        cy.get('i[class*="_5dbc img sp_DsFT2tc46le_2x sx_a81301"]', { timeout: 5000 })
        cy.get(selectors.loginPage.lastName).type('Hyphenated-LastName')
        cy.get(selectors.loginPage.newPassword).click()
        cy.get('i[class="_5dbc img sp_DsFT2tc46le_2x sx_a81301"]').should('be.visible')
        cy.get(selectors.loginPage.firstName).click()
        cy.get('div[id="js_9"]').contains("What’s your name?", { timeout: 7000 })
        cy.get(selectors.loginPage.firstName).type('Jamie-Lynn')
        cy.get(selectors.loginPage.newPassword).type('!@#$-=')
        cy.get('div[id="js_11"]').contains('Enter a combination of at least six numbers, letters and punctuation marks (like ! and &).')
        cy.get('i[class="_5dbc img sp_DsFT2tc46le_2x sx_a81301"]').should('not.be.visible')
    })

    it('Under 13', function () {
        cy.visitWebsite(selectors.url.facebook)
        cy.name('Under', '13')
        cy.emailAndPassword('littlekid@email.com', 'littlekid@email.com', 'probabaly a birthdate')
        cy.birthDateSex('1', '15', '2007', 1)
        cy.get(selectors.loginPage.signUp).contains('Sign Up').click()
        // cy.contains('Sorry, we are not able to process your registration.')
    })

    it('Default Birthdate', function () {
        cy.visitWebsite(selectors.url.facebook)
        cy.name('default', 'birthDay')
        cy.emailAndPassword('takemeToVegas@email.com', 'takemeToVegas@email.com', 'im_so_lucky')
        cy.get(selectors.loginPage.sex).eq(1).check()
        cy.get(selectors.loginPage.signUp).contains('Sign Up').click()
        cy.contains('Is ')
        cy.contains(' your birthday?')
        cy.contains('It looks like you entered the wrong info. Please be sure to use your real birthday.')
        cy.get('a[class*="layerCancel"]')
        cy.get('button[class*="layerConfirm"]')
    })

    it('Valid Email Bad Password', function () {
        cy.visitWebsite(selectors.url.facebook)
        cy.get(selectors.loginPage.emailOrPhone).type('kate@grow')
        cy.get(selectors.loginPage.password).type('wrongpassword!')
        cy.get(selectors.loginPage.loginButton).click()
        cy.url().should('include',
            'https://www.facebook.com/login/device-based/regular/login/?login_attempt=1&lwv=110')
        //One Failed Attempt
        cy.get(selectors.failedLogIn.emailOrPhone).type('kate@grow.com')
        cy.get(selectors.failedLogIn.password).type('wrongpasswordAGAIN!')
        cy.get(selectors.failedLogIn.loginButton).click()
        //Second Failed Attempt
        cy.get('div[role="alert"]').contains("The password you’ve entered is incorrect. ")
        cy.get(selectors.failedAttemptWithName.password).type('IdontknowwhatImdoing')
        cy.get(selectors.failedLogIn.loginButton).click()
        //Third Failed Attempt
        // cy.get('div[role="alert"]').contains("The password you’ve entered is incorrect. ")
        // cy.get(selectors.failedAttemptWithName.password).type('IdontknowwhatImdoing')
        // cy.get(selectors.failedLogIn.loginButton).click()
        //Kicked Out For Good
        cy.contains("You Can't Use This Feature Right Now")
    })
})