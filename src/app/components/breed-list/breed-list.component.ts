import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as breedActions from '../../actions/breed.actions';
import * as fromBreed from '../../reducers/breed.reducers';

@Component({
  selector: 'app-breed-list',
  templateUrl: './breed-list.component.html',
  styleUrls: ['./breed-list.component.scss']
})
export class BreedListComponent implements OnInit, OnDestroy {
  breeds: string[];
  breedImages: string[];
  isLoading: boolean;
  error: string;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private readonly store: Store) {
    this.store.select(fromBreed.getBreeds).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => this.breeds = data);

    this.store.select(fromBreed.getBreedImages).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => this.breedImages = data);

    this.store.select(fromBreed.isLoading).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => this.isLoading = data);

    this.store.select(fromBreed.getError).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => this.error = data);
  }

  ngOnInit(): void {
    this.store.dispatch(breedActions.getBreeds());
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  selectBreed(breed: string) {
    this.breedImages = [];
    this.store.dispatch(breedActions.getBreedImages({ breed: breed }));
  }

}
