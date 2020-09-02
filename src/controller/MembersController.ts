import { getRepository } from "typeorm";
import { Member } from "../entity/Member";
import { Request, Response, NextFunction } from "express";

export class MembersController {
    private membersRepo = getRepository(Member);

    /** Getting a list of all registerd members and users */
    async all(request: Request, response: Response, next: NextFunction) {
        return this.membersRepo.find();
    }

    /** Adding the vip status of a user for them to receive premium tips */
    async makevip(request: Request, response: Response, next: NextFunction) {
        let id = request.params.id
        const member = await this.membersRepo.findOne(id);
        if (!member.isVip) {
            member.isVip = true;
            await this.membersRepo.save(member);
            const status_message = {
                'success': 'user added to vip successfuly'
            }
            return status_message;

        } else {
            const status_message = {
                "message": "The selected user is already subscribed"
            }

            return status_message;
        }
    }

    async revokevip(request: Request, response: Response, next: NextFunction) {
        const member = await this.membersRepo.findOne(request.params.id)
        if(member.isVip) {
            member.isVip = false;

            await this.membersRepo.save(member);
            return member
        } else {
            let status_message = {
                "error": "the selected member is not subscribed to a premium service"
            }

            return status_message;
        }
    }

     /** Will be used to show the details of a particular user. For instance in a profile/account view of an account */
    async profile(request: Request, response: Response, next: NextFunction) {
        const user = await this.membersRepo.findOne(request.params.id);
        return user;
    }


}