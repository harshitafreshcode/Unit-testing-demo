import chai from 'chai'
import chaiHttp from 'chai-http'
const app = require('../src/index.js');

chai.use(chaiHttp);
const expect = chai.expect;

describe('User API', () => {
    describe('GET /get-all-user', () => {
        it('should handle user registration', (done) => {
            chai.request(app)
                .get('/get-all-user')
                // .send({ username: 'testUser', password: 'testpassword' })
                .end((err, res) => {
                    if (err) {
                        console.log(err, 'err');
                        expect(res).to.have.status(500);
                        // expect(res.body).to.have.property('message').that.is.equal('An error occurred!!');
                    } else {
                        expect(res).to.have.status(200);
                        // expect(res.body).to.have.property('message').equal('User registered successfully');
                    }

                    done();
                });
        });
    });
});

describe('User API POST', () => {
    describe('Post /add-user', () => {
        it('should handle user add', (done) => {
            chai.request(app)
                .post('/add-user')
                .send({
                    first_name: "req.body.first_name",
                    last_name: "req.body.last_name",
                    password: "req.body.password",
                    email: "req188@gmail.com",
                    phone: "7894561236",
                    status: 1,
                    // role_id: 4

                })
                .end((err, res) => {
                    if (err) {
                        expect(res).to.have.status(500);
                        // expect(res.body).to.have.property('message').that.is.equal('An error occurred!!');
                    } else {
                        expect(res).to.have.status(200);
                        // expect(res.body).to.have.property('message').equal('User registered successfully');
                    }

                    done();
                });
        });
    });
});


describe('User API PATCH', () => {
    describe('Patch edit-user/:id', () => {
        it('should handle user update', (done) => {
            const id = 1; // The ID of the user you want to edit

            chai.request(app)
                .patch(`/edit-user/${id}`)
                // .patch(`/edit-user?id=${id}`) // Use query parameter for user ID
                .send({
                    first_name: "req.body.first_name",
                    last_name: "req.body.last_name",
                    password: "req.body.password",
                    email: "req11@gmail.com",
                    phone: "7894561236",
                    status: 1,
                    // role_id: 4

                })
                .end((err, res) => {
                    if (err) {
                        expect(res).to.have.status(500);
                        // expect(res.body).to.have.property('message').that.is.equal('An error occurred!!');
                    } else {
                        expect(res).to.have.status(200);
                        // expect(res.body).to.have.property('message').equal('User registered successfully');
                    }

                    done();
                });
        });
    });
});


describe('User API DELETE', () => {
    describe('Delete /delete-user/:id', () => {
        it('should handle user delete', (done) => {
            const id = 1; // The ID of the user you want to edit

            chai.request(app)
                .delete(`/delete-user/${id}`)
                // .send({
                //     first_name: "req.body.first_name",
                //     last_name: "req.body.last_name",
                //     password: "req.body.password",
                //     email: "req11@gmail.com",
                //     phone: "7894561236",
                //     status: 1,
                //     // role_id: 4

                // })
                .end((err, res) => {
                    if (err) {
                        expect(res).to.have.status(500);
                        // expect(res.body).to.have.property('message').that.is.equal('An error occurred!!');
                    } else {
                        expect(res).to.have.status(200);
                        // expect(res.body).to.have.property('message').equal('User registered successfully');
                    }

                    done();
                });
        });
    });
});
