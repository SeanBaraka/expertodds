import {UserController} from "./controller/UserController";
import { MembersController } from "./controller/MembersController";
import { TipsController } from "./controller/TipsController";

export const Routes = [{
    method: "get",
    route: "/api/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/api/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/api/auth/register",
    controller: UserController,
    action: "register"
}, {
    method: "delete",
    route: "/api/users/:id",
    controller: UserController,
    action: "remove"
}, {
    method: 'post',
    route: '/api/auth/login',
    controller: UserController,
    action: 'login'
}, {
    method: 'delete',
    route: '/api/users/remove/:id',
    controller: UserController,
    action: 'removeMember'
},
// Members Routes
{
    method: 'get',
    route: '/api/members',
    controller: MembersController,
    action: 'all'
},
{
    method: 'post',
    route: '/api/members/makevip/:id',
    controller: MembersController,
    action: 'makevip'
},
{
    method: 'post',
    route: '/api/members/revokevip/:id',
    controller: MembersController,
    action: 'revokevip'
},
{
    method: 'get',
    route: '/api/members/profile/:id',
    controller: MembersController,
    action: 'profile'
},

// Tips Routes
{
    method: 'get',
    route: '/api/tips/free',
    controller: TipsController,
    action: 'free'
},
{
    method: 'get',
    route: '/api/tips/premium',
    controller: TipsController,
    action: 'premium'
},
{
    method: 'post',
    route: '/api/tips/predict/',
    controller: TipsController,
    action: 'addtips'
},
{
    method: 'post',
    route: '/api/tips/finish/:id',
    controller: TipsController,
    action: 'markasfinished'
},
{
    method: 'get',
    route: '/api/tips/finished/archives',
    controller: TipsController,
    action: 'archives'
},
{
    method: 'patch',
    route: '/api/tips/edit/:id',
    controller: TipsController,
    action: 'editprediction'
}

];