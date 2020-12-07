import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { BreedService } from '../services/breed.service';
import * as breedActions from '../actions/breed.actions';

@Injectable()
export class BreedEffects {

    constructor(
        private actions$: Actions,
        private breedService: BreedService
    ) { }

    getBreeds$ = createEffect(() =>
        this.actions$.pipe(
            ofType(breedActions.getBreeds),
            exhaustMap(() =>
                this.breedService.getBreeds().pipe(
                    map(response => breedActions.getBreedsSuccess({ response })),
                    catchError((error: any) => of(breedActions.getBreedsError(error))))
            )
        )
    );

    getBreedImages$ = createEffect(() =>
        this.actions$.pipe(
            ofType(breedActions.getBreedImages),
            exhaustMap(action =>
                this.breedService.getBreedImages(action.breed).pipe(
                    map(response => breedActions.getBreedImagesSuccess({ response })),
                    catchError((error: any) => of(breedActions.getBreedImagesError(error))))
            )
        )
    );

}