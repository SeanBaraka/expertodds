import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import { Member } from "../entity/Member";
import { pbkdf2Sync, randomBytes} from "crypto";
import * as jwt from 'jsonwebtoken';

export class UserController {

    private userRepository = getRepository(User); // Initalizing the users repository

    private memberRepository = getRepository(Member); // Initializing the members repository

    /** Getting a list of all system users */
    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    /** Will be used to show the details of a particular user. For instance in a profile/account view of an account */
    async one(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOne(request.params.id);
    }

    /** User registration. Adding a user into the system */
    async register(request: Request, response: Response, next: NextFunction) {
        let user = new User();
        let userToRegister = request.body
        let userObject = {
            firstName: userToRegister.firstName,
            lastName: userToRegister.lastName,
            email: userToRegister.email,
            telephone: userToRegister.telephone,
            password: userToRegister.password
        }

        user.email = userObject.email;

        // create a random salt for the user being registered
        user.salt = randomBytes(16).toString('hex');

        user.password = pbkdf2Sync(userObject.password, user.salt, 1000, 64, 'sha512').toString('hex');

        try {

            const memberToRegister = this.memberRepository.save({
                firstName: userObject.firstName,
                lastName: userObject.email,
                telephone: userObject.telephone,
                user: user
            })
    
            return memberToRegister;

        } catch (error) {
            return error
        }
    }

    /** Login Funtion here */
    async login(request: Request, response: Response, next: NextFunction) {
        const dotenv = require('dotenv')
        dotenv.config();

        const loginRequest = request.body

        //an object that holds the request body values
        let userToLogin = {
            email: loginRequest.email,
            password: loginRequest.password
        }

        // first check if user exists in the database
        let user = await this.userRepository.findOne({ where: {
            email: userToLogin.email
        }})
        // if the user exists
        if(user) {
            // attempt login with password
            const hashPassword = pbkdf2Sync(userToLogin.password, user.salt, 1000, 64, 'sha512').toString('hex');

            if(user.password == hashPassword) {
                // successful login
                // get the corresponding member records for the particular user. if any
                const member = await this.memberRepository.findOne({where: {user: user}});
                let pvv = false;
                if(member != null || member != undefined) {
                    pvv = member.isVip
                }
                
                // Should generate a jwt token
                let token = this.generateToken({user: user.email,pm: user.isStaff, pvv:pvv})
 
                const success_login = {
                    'token': token
                }

                return success_login;

            } else {
                const error_login = {
                    "error": "incorrect login credentials"
                }

                return error_login;
            }

        } else {
            const message = {
                "error": "The given member does not exist"
            }
            return message;
        }

    }

    /** Removing a user from our database */
    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove);
    }

    async removeMember(req: Request, res: Response, next: NextFunction) {
        let memberToRemove = await this.memberRepository.findOne(req.params.id);
        const removed = await this.memberRepository.remove(memberToRemove);
        if(removed) {
            return "user removed sucessfuly"
        } else {
            return 'there was an error removing the selected user'
        }
    }

    /** Creating a secret code to use as jwt secret code. This
     * is not a public route and thus not enabled in the controller 
     * routes
     */
    async generate(request: Request, response: Response) {
        return randomBytes(64).toString('hex');
    }

    generateToken(userData: string | object | Buffer) {
        return jwt.sign(userData, process.env.APP_SECRET, {expiresIn: '60 days'})
    }

}