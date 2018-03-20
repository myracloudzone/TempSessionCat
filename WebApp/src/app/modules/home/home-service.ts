import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {URLSearchParams} from '@angular/http';

@Injectable()
export class DataService {
    constructor(private http: HttpClient) {

    }

    getData(ids) {
        let params = new URLSearchParams();
        params.set('request', JSON.stringify(ids));
        return this.http.get('http://127.0.0.1:4300/sessions'+ '?' + params.toString(), { observe: 'response' });
    }

    getLevels() {
        return this.http.get('http://127.0.0.1:4300/levels', { observe: 'response' });
    }

    getLocations() {
        return this.http.get('http://127.0.0.1:4300/locations', { observe: 'response' });
    }

    getStatus() {
        return this.http.get('http://127.0.0.1:4300/status', { observe: 'response' });
    }


    getTags() {
        return this.http.get('http://127.0.0.1:4300/tags', { observe: 'response' });
    }

    getTracks() {
        return this.http.get('http://127.0.0.1:4300/tracks', { observe: 'response' });
    }

    getTypes() {
        return this.http.get('http://127.0.0.1:4300/types', { observe: 'response' });
    }
}