import { getRepository, TreeParent } from "typeorm";
import { Tip } from "../entity/Tip";
import { Request, Response, NextFunction } from "express";
import * as authValidator from "../middleware/auth";
import { User } from "../entity/User";
import { fail } from "assert";
import { FinishedMatch } from "../entity/FinishedMatch";
import { REPLServer } from "repl";
import { runInThisContext } from "vm";

export class TipsController {

    // Initialize the repositories to use.
    private tipsRepository = getRepository(Tip);
    private finishedMatchesRepo = getRepository(FinishedMatch);

    /** Get all tips, free tips only */
    async free(request: Request, response: Response, next: NextFunction) {
        const tips = this.getTips();
        return tips;
    }

    /** Get all premium tips */
    async premium(request, response: Response, next: NextFunction) {
        await authValidator.checkValidateToken(request, response, next);

        let tips = Array<Tip>(); // Initialize an empty array of tips.
        
        /** check if the user is either an admin user or a premium user
         * if the user fails the validations, they are thrown a 403 forbiden
         * error message.
         */
        if(!request.user.pm) {
            if(!request.user.pvv) {
                response.status(403)
                const not_allowed = {
                    "message": "you are currently not allowed to view premium tips. subscribe now and I will get out of our way *wink!"
                }
                return not_allowed;
            }
        }
        
        
        /** If the user is an admin user or a premium user, display premium tips*/
        if(request.user.pm) {
            // if the user is an admin user.
            tips = await this.getTips(request.user.pm); // read and assign the tips list
            
        } else if(request.isvip) {
            // if the user is a premium user.
            tips = await this.getTips(request.isvip);
        }

        return tips;
    }

    /** Gets tips from the repository based on the parameter passed.
     * when the parameter is true, then it picks the vip tips otherwise
     * picks the free tips.
     */
    async getTips(isvip?: boolean) {
        /** Introduced the iscomple flag to the tip object,
         * it is used to determine whether a prediciton has been marked as
         * complete or not
         */
        if(isvip) {
            const premiumTips = await this.tipsRepository.find({
                where: {
                    isVip: true ,
                    isComplete: false
                }
            })

            /** Making sure that all tips that are updated do not appear here */
            premiumTips.forEach(async (prediction) => {
                const match = await this.finishedMatchesRepo.findOne({where:{
                    fixture: {
                        id: prediction.id
                    }
                }})

                if(match != null) {
                    await this.tipsRepository.update(prediction.id, {isComplete: true})
                }
            })
            return premiumTips.filter((x) => x.isComplete == false);

        } else {
            const freeTips = await this.tipsRepository.find({where:{isVip: false, isComplete: false}});

            freeTips.forEach(async (prediction) => {
                const match = await this.finishedMatchesRepo.findOne({where:{
                    fixture: {
                        id: prediction.id
                    }
                }})

                if(match != null) {
                    await this.tipsRepository.update(prediction.id, {isComplete: true})
                }
            })

            return freeTips.filter((x)=>x.isComplete == false);
        }
    }

    /** Adding tips to the database */
    async addtips(request, response: Response, next: NextFunction) {
        await authValidator.checkValidateToken(request, response, next);

        const isadmin = request.user.pm
  
        let requestBody = request.body;
        
        if(isadmin) {
            // Adding tips to the database
            let added = await this.tipsRepository.save(request.body)
            
            // display a success message on a successful addition of a prediciton
            if(added != null) {
                const success_message = {
                    "message": "the prediction has been posted successfuly, whoah!!"
                }
    
                response.status(201) // created
                return success_message;
            }
            
        } else {
            response.status(401) // unauthorized to perform the operation
            const not_possible = {
                "message": "you are not authorized to do this. sorry!!"
            }
            return not_possible;
        }
        
    }

    /** Marks fixture as finished by updating the score as well as the prediction win status. */
    async markasfinished(request, response: Response, next: NextFunction) {
        const tipId = request.params.id; // read the id from the request parameters
        const tipToEdit = await this.tipsRepository.findOne(tipId); // attempting to find the prediction from the database

        if(tipToEdit != null) {

            const updatePrediction = await this.tipsRepository.update(tipId,{isComplete: true});

            const markFinished = await this.finishedMatchesRepo.save({
                score: request.body.score,
                isWon: request.body.isWon,
                fixture: tipToEdit
            })

            // on successful editing of a fixture
            
            if(updatePrediction && markFinished) {
                response.status(200)

                const update_message = {
                    "message": "match ended and scores updated. boom!!"
                }

                return update_message;
            }
        } else {
            response.status(404)
            const not_found = {
                "message": "you sure you got the right fixture, I can't seem to find it."
            }
            return not_found;
        }
    }


    /** Archives
     * Retrieving a list of all past matches. Predictions plus scores and possible winnings.
     */
    async archives(request: Request, response: Response) {
        const finishedmatches = await this.finishedMatchesRepo.find()
        const sortedMatches = finishedmatches.sort((a, b) => new Date(a.fixture.matchDate).getDate() - new Date(b.fixture.matchDate).getDate()).reverse()
        
        return sortedMatches;
    }
   
    /** Incase of any errors or typos in the prediction.
     * this method makes it possible to edit the prediciton
     */
    async editprediction(request: Request, response: Response) {
        const matchId = request.params.id;
        const matchToEdit = await this.tipsRepository.findOne(matchId);

        // if a match matching the id is found
        if(matchToEdit) {
            const tryToUpdate = await this.tipsRepository.update(matchId, request.body)
            
            if(tryToUpdate.affected > 0) {
                response.status(202)
                const update_message = {
                    "message": "fixture updated successfuly. done!!"
                }
                return update_message;
            }
        }
    }

    async getFeaturedMatch(request: Request, resp: Response) {
        let featuredMatch = {};
        let match = (await this.tipsRepository.find({ where: { isFeatured: true } })).pop();

        /** Here, we use the difference in times to determine whether the 
         * featured match is still valid. assumption is made that a featured match will have to change atleast once in 3 days
         */
        let dateDifference = new Date(match.matchDate).getDate() - new Date(Date.now()).getDate(); // getting the date difference
        
        if (dateDifference <= -1 && dateDifference > -3) {
            featuredMatch = match
        }
        
        return match;
    }
}