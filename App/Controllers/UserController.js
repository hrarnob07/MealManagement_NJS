import Joi from "@hapi/joi";
import jwt from "jsonwebtoken";
import hash from "password-hash";
const User = require("../Models").user;
import {
    session
} from "../Config/app";

class UserController {
    async all(request, response) {
        await User.findAll({
            attributes: {
                exclude: ["password"]
            }
        })
            .then(users => {
                response.json({
                    success: true,
                    message: `Found ${users.length} users in row`,
                    data: users
                });
            })
            .catch(error => {
                response.json({
                    success: false,
                    message: error.name
                });
            });

        return response;

    }
    async findById(request, response) {
        await Joi.validate(request.params, Joi.object().keys({
            userId: Joi.number().required()
        }))
            .then(data => {
                return User.findByPk(data.userId);
            })
            .then(user => {
                response.json({
                    success: true,
                    message: "Response success",
                    data: user
                });
            })
            .catch(error => {
                response.json({
                    success: false,
                    message: error.name
                });
            });
        return response;
    }
    async verifyLogin(request, response) {
        const schema = Joi.object().keys({
            email: Joi.string()
                .email({
                    minDomainSegments: 2
                })
                .required(),
            password: Joi.string().required()
        });
        await Joi.validate(request.body, schema)
            .then(async () => {
                let {
                    email,
                    password
                } = request.body;
                
                console.log("password",password);
                await User.findOne({
                    where: {
                        email: email
                    }
                   
                })
                    .then(user => {
                        if (user !== null) {
                            if ( hash.verify(password, user.password)) {
                                const payload = {
                                    data: user
                                };
                                const options = {
                                    ...session.OPTIONS,
                                    expiresIn: session.EXPIRESIN
                                };
                                const token = jwt.sign(payload, session.SECRET, options);
                                response.json({
                                    success: true,
                                    message: "You have successfully logged in",
                                    token: token
                                });
                            } else {
                                response.json({
                                    success: false,
                                    message: "Invalid user password"
                                });
                            }
                        } else {
                            response.json({
                                success: false,
                                message: "No account found with this email"
                            });
                        }
                    })
                    .catch(error => {
                        response.json({
                            success: false,
                            message: error.details[0]
                        });
                    });
            })
            .catch(error => {
                response.json({
                    success: false,

                    message: error.details[0].message
                });
            });
        return response;
    }

    async create(request, response) {

        // return response.json({
        //     data:request.body
        // })

        const schema = Joi.object().keys({
            name: Joi.string().trim().required(),
            email: Joi.string().trim()
                .email({
                    minDomainSegments: 2
                })
                .required(),
            password: Joi.string().trim().required(),
            photo_path: Joi.any().empty(),
            address: Joi.any().empty(),
            profession: Joi.any().empty(),
            role: Joi.any().empty(),
            state: Joi.any().empty()
        });
       
       
        await Joi.validate(request.body, schema)
            .then(data => {

                const role = data.role === undefined ? "user" : data.role;
                const state = data.state === undefined ? "Pending" : data.state;
                const address = data.address === undefined ? null : data.address;
                const profession = data.profession === undefined ? null : data.profession;
                const photo_path = data.photo_path === undefined ? null : data.photo_path;
                const password = hash.generate(data.password);
                console.log(data);
               

                return User.create({
                    name: data.name,
                    email: data.email,
                    password: password,
                    photo_path: photo_path,
                    address: address,
                    profession: profession,
                    role: role,
                    state: state
                });
            })
            .then(user => {
                response.status(201).json({
                    success: true,
                    message: "user create successfully done.",
                    data: user
                });
            })
            .catch(error => {
                const msg = !("isJoi" in error) ?
                    ("original" in error && "sqlMessage" in error.original) ?
                        error.original.sqlMessage :
                        error.errors[0].message :
                    error.details[0].message;
                response.json({
                    success: false,
                    message: msg
                });
            });
        return response;
    }

    async edit(request, response) {
        const schema = Joi.object().keys({
            user_id: Joi.number().required(),
            nickname: Joi.string().trim().alphanum().required(),
            email: Joi.string().trim()
                .email({
                    minDomainSegments: 2
                })
                .required(),
            photo_path: Joi.any().empty(),
            region: Joi.any().empty(),
            profession: Joi.any().empty(),
        });

        await Joi.validate(request.body, schema)
            .then(data => {
                const region = data.region === undefined ? null : data.region;
                const profession = data.profession === undefined ? null : data.profession;
                const photo_path = data.photo_path === undefined ? null : data.photo_path;

                return User.update({
                    nickname: data.nickname,
                    email: data.email,
                    photo_path: photo_path,
                    region: region,
                    profession: profession
                }, {
                    returning: true,
                    where: {
                        id: data.user_id
                    }
                });
            })
            .then((d) => {
                response.status(201).json({
                    success: true,
                    message: "user profile update success",
                    data: d
                });
            })
            .catch(error => {
                const msg = !("isJoi" in error) ?
                    ("original" in error && "sqlMessage" in error.original) ?
                        error.original.sqlMessage :
                        error.name :
                    error.details[0].message;
                response.json({
                    success: false,
                    message: error
                });
            });
        return response;
    }

    async verifyToken(request, response) {
        console.log(request.decoded);
        return response.json({
            success: true,
            message: "Authorization success",
            data: request.decoded
        });
    }
}

export default new UserController();