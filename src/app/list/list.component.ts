import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarWarsService } from '../star-wars.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

    characters = [];
    activetedRoute: ActivatedRoute;
    starWarsService: StarWarsService;
    loadedSide = 'all';
    subscription: Subscription;

    constructor(activetedRoute: ActivatedRoute, starWarsService: StarWarsService) {
        this.activetedRoute = activetedRoute;
        this.starWarsService = starWarsService;
    }

    ngOnInit() {
        this.activetedRoute.params.subscribe(
            (params) => {
                this.loadedSide = params.side;
                this.loadList();
            }
        );
        this.subscription = this.starWarsService.charactersChanged.subscribe(
            () => {
                this.loadList();
            }
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    loadList() {
        this.characters = this.starWarsService.getCharacters(this.loadedSide);
    }

}
