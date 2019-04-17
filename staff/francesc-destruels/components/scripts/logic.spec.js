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
                logic.register(name, surname, 'carlos.com', password, confirmPassword);
            }).toThrowError(TypeError, 'carlos.com is not a valid e-mail');
        });

        true && it('should fail on non-matching passwords', function () {
            expect(function () {
                logic.register(name, surname, email, password, undefined);
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

        true && it('should fail on wrong email (unexisting user)', function () {
            var _error;

            try {
                logic.login('pepitogrillo@gmail.com', password);
            } catch (error) {
                _error = error;
            }

            expect(_error).toBeDefined();
            expect(_error.code).toBe(1);
        });

        true && it('should fail on wrong password', function () {
            var _error;

            try {
                logic.login(email, '456666');
            } catch (error) {
                _error = error;
            }

            expect(_error).toBeDefined();
            expect(_error.code).toBe(1);
        });

        true && it('should fail on wrong password (existing user)', function () {
            var _error;

            try {
                logic.login(email, '456666');
            } catch (error) {
                _error = error;
            }

            expect(_error).toBeDefined();
            expect(_error.code).toBe(1);
        });
    });

    describe('search ducks', function () {
        true && it('should succeed on correct query', function (done) {
            logic.searchDucks('yellow', function (ducks) {
                expect(ducks).toBeDefined();
                expect(ducks instanceof Array).toBeTruthy();
                expect(ducks.length).toBe(13);

                done();
            });
        });

        true && it('should fail on undefined quary', function () {
            var _error;

            try {
                logic.searchDucks(undefined, function(){console.log('hello');});
            } catch (error) {
                _error = error;
            }

            expect(_error).toBeDefined();
            expect(_error.code).toBe(8);
        });

        true && it('should fail on undefined callback', function () {
            var _error;

            try {
                logic.searchDucks('hola', 'tomate');
            } catch (error) {
                _error = error;
            }

            expect(_error).toBeDefined();
            expect(_error.code).toBe(9);
        });
    });

    describe('retrieve ducks', function () {
        true && it('should succeed on correct query', function (done) {
            logic.retrieveDucklingDetail('5c3853aebd1bde8520e66e11', function (ducks) {
                expect(ducks).toBeDefined();
                expect(ducks instanceof Object).toBeTruthy();
                expect(ducks.id).toBe("5c3853aebd1bde8520e66e11");

                done();
            });
        });

        true && it('should fail on undefined id', function () {
            var _error;

            try {
                logic.retrieveDucklingDetail(undefined, function(){console.log('hello');});
            } catch (error) {
                _error = error;
            }

            expect(_error).toBeDefined();
            expect(_error.code).toBe(8);
        });

        true && it('should fail on undefined callback', function () {
            var _error;

            try {
                logic.retrieveDucklingDetail('hola', 'tomate');
            } catch (error) {
                _error = error;
            }

            expect(_error).toBeDefined();
            expect(_error.code).toBe(9);
        });
    });
});