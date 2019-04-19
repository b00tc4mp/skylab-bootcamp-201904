'use strict'

describe('user api', () => {

    
    !true && it('', function () {
        expect().toEqual();
    })


    describe('register', () => {

        true && it('Should succes on sending all required data', done => {
            const name = "Fran"
            const surname = "Destruels"
            const username = "2@"
            const password = 234

            userApi.registerUser(name, surname, username, password, (response) => {
                expect(response).toBeDefined();

                const {status, data: {id}} = response

                expect(status).toBe(`OK`)
                expect(typeof id).toBe('string')

                done();
            });
        })

        !true && it('Should fail by do not sending Name', function () {
            
        })

        !true && it('Should fail by do not sending Surname', function () {
            expect().toEqual();
        })

        !true && it('Should fail by do not sending E-mail', function () {
            expect().toEqual();
        })

        !true && it('Should fail by do not sending Password', function () {
            expect().toEqual();
        })

    })

})