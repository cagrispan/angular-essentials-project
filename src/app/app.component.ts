import { Component, OnInit } from '@angular/core';
import { StarWarsService } from './star-wars.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    starWarsService: StarWarsService;
    title = 'app';

    constructor(starWarsService: StarWarsService) {
        this.starWarsService = starWarsService;
    }

    ngOnInit() {
        this.starWarsService.fetchCharacters();
    }
}
