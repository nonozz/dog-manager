import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { BreedService } from './breed.service';

const mockBreeds = {};

describe('BreedService', () => {
  let httpMock: HttpTestingController;
  let service: BreedService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        BreedService
      ]
    });
  });

  beforeEach(
    inject([BreedService, HttpTestingController], (_service, _httpMock) => {
      service = _service;
      httpMock = _httpMock;
  }));

  it('getBreeds() should call the server', () => {
    service.getBreeds().subscribe();

    const req = httpMock.expectOne('https://dog.ceo/api/breeds/list/all');

    req.flush(mockBreeds);
    httpMock.verify();
  });

});