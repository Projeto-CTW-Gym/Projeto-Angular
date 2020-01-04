import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from '../../models/subscription';
import { UserServiceService } from './user-service.service';
import { User } from '../../models/user';

@Injectable({
    providedIn: 'root'
})

export class SubscriptionServiceService {



    private apiUrl = 'http://localhost:8080/Projeto-CTW/api/subscription';
    private subscription: Subscription = new Subscription();
    private user;
    private session;
    private subType: string;

    constructor(
        private http: HttpClient,
        private userService: UserServiceService
    ) { }

    public sub(user: number, session: number, subType: string) {
        this.user = { id: this.userService.getUserId() };
        this.session = { id: session };
        let subscription = { 'user': this.user, 'trainingSession': this.session, 'subType': subType };
        return this.http.post(this.apiUrl, subscription);
    }

    public unsub(id: number) {
        return this.http.delete(this.apiUrl + '/' + id);
    }

    public getAllUsersBySession(sessionId: number): any {
        console.log("ENTREI");

        return this.http.get('http://localhost:8080/Projeto-CTW/api/user/session/' + sessionId);

    }

    public getSubscription(sessionId: number, userId: number) {
        return this.http.get(this.apiUrl + '/user/' + userId + '/session/' + sessionId);
    }

    public getSubscriptionById(subId: number) {
        return this.http.get(this.apiUrl + "/" + subId);
    }

    public setAttendance(subId: number, subscription: Subscription) {
        return this.http.put(this.apiUrl + "/" + subId, subscription);
    }

    public getAllSubsBySession(id: number) {
        return this.http.get(this.apiUrl + "/session/" + id);
    }

    public setAnswers(subId, data) {

        return this.http.put(this.apiUrl + "/" + subId, data);
    }
}

