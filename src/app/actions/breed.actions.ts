import { createAction, props } from '@ngrx/store';

export const getBreeds = createAction(
    '[Breed] Get Breeds'
);

export const getBreedsSuccess = createAction(
    '[Breed] Get Breeds Success',
    props<any>()
);

export const getBreedsError = createAction(
    '[Breed] Get Breeds Error',
    props<any>()
);

export const getBreedImages = createAction(
    '[Breed] Get Breed Images',
    props<{breed: string}>()
);

export const getBreedImagesSuccess = createAction(
    '[Breed] Get Breed Images Success',
    props<any>()
);

export const getBreedImagesError = createAction(
    '[Breed] Get Breed Images Error',
    props<any>()
);
