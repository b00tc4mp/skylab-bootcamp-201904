'use strict';

describe('logic', function () {
    var name = 'Peter';
    var surname = 'Seller';
    var email = 'peterseller@gmail.com';
    var password = '123456';
    var confirmPassword = '123456';

    beforeEach(function () {
        users.length = 0;
    });

    describe('register', function () {
        true && it('should succeed on correct data', function () {
            var user = {
                name: name,
                surname: surname,
                email: email,
                password: password,
            };

            var currentUsersCount = users.length;

            logic.register(name, surname, email, password, confirmPassword);

            expect(users.length).toBe(currentUsersCount + 1);

            var lastUser = users[users.length - 1];
            expect(lastUser).toEqual(user);
        });

        true && it('should fail on undefined name', function () {
            expect(function () {
                logic.register(undefined, surname, email, password, confirmPassword);
            }).toThrowError(TypeError, 'undefined is not a valid name');
        });

        true && it('should fail on undefined surname', function () {
            expect(function () {
                logic.register(name, undefined, email, password, confirmPassword);
            }).toThrowError(TypeError, 'undefined is not a valid surname');
        });

        true && it('should fail on a undefined e-mail', function () {
            expect(function () {
                logic.register(name, surname, undefined, password, confirmPassword);
            }).toThrowError(TypeError, 'undefined is not a valid e-mail');
        });

        true && it('should fail on a non proper e-mail', function () {
            expect(function () {
                logic.register(name, surname, 'carlos.com' , password, confirmPassword);
            }).toThrowError(TypeError, 'carlos.com is not a valid e-mail');
        });

        true && it('should fail on non-matching passwords', function () {
            expect(function () {
                logic.register(name, surname, email  , password, undefined);
            }).toThrowError(TypeError, 'Passwords do not match');
        });
    });

    describe('login', function () {
        beforeEach(function () {
            users.push({
                name: name,
                surname: surname,
                email: email,
                password: password
            });
        });

        true && it('should succeed on correct data', function () {
            logic.login(email, password);

            expect(logic.__userEmail__).toBe(email);
            // expect(logic.__accessTime__ / 1000).toBeCloseTo(Date.now() / 1000, 1);
        });

        // TODO fail cases
    });
});