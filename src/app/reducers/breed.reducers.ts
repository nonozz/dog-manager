import { createReducer, on } from '@ngrx/store';
import * as breedActions from '../actions/breed.actions';

export interface BreedState {
  isLoading: boolean,
  breeds: string[];
  breedImages: string[];
  error: string;
}

export const initialState: BreedState = {
  isLoading: false,
  breeds: [],
  breedImages: [],
  error: null
};

export const reducer = createReducer(
  initialState,

  on(breedActions.getBreeds, state => ({
    ...state,
    isLoading: true,
    error: null
  })),

  on(breedActions.getBreedsSuccess, (state, result) => {
    let breeds = [...Object.keys(result.response.message)];

    breeds.forEach(parentBreed => {
      if (Array.isArray(result.response.message[parentBreed])) {
        result.response.message[parentBreed].forEach(childBreed => {
          breeds.push(parentBreed + '/' + childBreed)
        });
      }
    });

    return ({
      ...state,
      breeds: breeds.sort(),
      isLoading: false,
      error: null
    })
  }),

  on(breedActions.getBreedImages, state => ({
    ...state,
    isLoading: true,
    error: null
  })),

  on(breedActions.getBreedImagesSuccess, (state, result) => ({
    ...state,
    breedImages: result.response.message,
    isLoading: false,
    error: null
  })),

  on((
    breedActions.getBreedsError,
    breedActions.getBreedImagesError
  ), (state, result) => ({
    ...state,
    isLoading: false,
    error: result.message
  })),

);

export const getBreeds = state => state.breed.breeds;

export const getBreedImages = state => state.breed.breedImages;

export const isLoading = state => state.breed.isLoading;

export const getError = state => state.breed.error;
