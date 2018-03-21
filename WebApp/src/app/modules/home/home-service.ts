import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {URLSearchParams} from '@angular/http';
declare var $: any;

@Injectable()
export class DataService {
    url : string = location.protocol+'//'+location.hostname+':4200'; 
    constructor(private http: HttpClient) {

    }

    getData(ids) {
        let params = new URLSearchParams();
        params.set('request', JSON.stringify(ids));
        return this.http.get(this.url+'/sessions'+ '?' + params.toString(), { observe: 'response' });
    }

    getLevels() {
        return this.http.get(this.url+'/levels', { observe: 'response' });
    }

    getDistinctDates() {
        return this.http.get(this.url+'/distinctDates', { observe: 'response' });
    }

    getLocations() {
        return this.http.get(this.url + '/locations', { observe: 'response' });
    }

    getSpeakerSesssion(id) {
        let params = new URLSearchParams();
        params.set('speakerId', id);
        return this.http.get(this.url + '/speakerSesssion'+ '?' + params.toString(), { observe: 'response' });
    }

    getStatus() {
        return this.http.get(this.url+'/status', { observe: 'response' });
    }


    getTags() {
        return this.http.get(this.url+'/tags', { observe: 'response' });
    }

    getTracks() {
        return this.http.get(this.url+'/tracks', { observe: 'response' });
    }

    getTypes() {
        return this.http.get(this.url+'/types', { observe: 'response' });
    }
}