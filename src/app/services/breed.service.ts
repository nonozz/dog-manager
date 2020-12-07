import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class BreedService {

    constructor(private http: HttpClient) { }

    apiUrl = 'https://dog.ceo/api/';

    getBreeds() {
        return this.http.get(this.apiUrl + 'breeds/list/all');
    }

    getBreedImages(breed: string) {
        return this.http.get(this.apiUrl + 'breed/' + breed + '/images');
    }

}