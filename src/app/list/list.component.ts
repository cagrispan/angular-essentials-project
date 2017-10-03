import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarWarsService } from '../star-wars.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

    characters = [];
    activetedRoute: ActivatedRoute;
    starWarsService: StarWarsService;

    constructor(activetedRoute: ActivatedRoute, starWarsService: StarWarsService) {
        this.activetedRoute = activetedRoute;
        this.starWarsService = starWarsService;
     }

    ngOnInit() {
        this.activetedRoute.params.subscribe(
            (params) => {
                this.characters = this.starWarsService.getCharacters(params.side);
            }
        );
    }

}
