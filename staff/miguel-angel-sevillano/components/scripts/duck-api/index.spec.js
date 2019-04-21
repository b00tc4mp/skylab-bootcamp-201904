'use strict'

describe('duck api', () => {
    describe('search ducks', () => {
        it('should succeed on correct query', (done) => {
            duckApi.searchDucks('yellow', (ducks) => {
                expect(ducks).toBeDefined()
                expect(ducks instanceof Array).toBeTruthy()
                expect(ducks.length).toBe(13)

                done()
            })

        })
        it('should succeed on empty query', (done) => {
            duckApi.searchDucks(' ',(ducks) => {
                expect(ducks).toBeDefined()
                expect(ducks instanceof Array).toBeTruthy()
                done()
            })

        })
     
    })
    describe('retrive duck', () => {
        it('should succeed on retrive a duck', (done) => {
            let id = '5c3853aebd1bde8520e66e1b'

            duckApi.retrieveDuck(id, (ducks) => {
                
                expect(ducks).toBeDefined()
                done()
            })

        })
        it('should fail on undefined id', (done) => {
            let id2;
            duckApi.retrieveDuck(id2,(ducks) => {
               
                expect(ducks).toBe('id needed')
                done()
            })

        })
        
     
    })

})