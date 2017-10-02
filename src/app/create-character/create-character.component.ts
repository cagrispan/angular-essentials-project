import { Component, OnInit } from '@angular/core';

import { StarWarsService } from '../star-wars.service';

@Component({
    selector: 'app-create-character',
    templateUrl: './create-character.component.html',
    styleUrls: ['./create-character.component.css']
})
export class CreateCharacterComponent implements OnInit {

    availableSides = [
        { display: 'None', value: '' },
        { display: 'Light', value: 'light' },
        { display: 'Dark', value: 'dark' }
    ];
    starWarsService: StarWarsService;

    constructor(starWarsService: StarWarsService) {
        this.starWarsService = starWarsService;
    }

    ngOnInit() {
    }

    onSubmit(form) {
        if (form.invalid) {
            console.log('This form is invalid.');
        } else {
            this.starWarsService.addCharacter(form.value.name, form.value.side);
        }
    }

    isValid(nameCtrl) {
        return !nameCtrl.invalid && nameCtrl.touched;
    }

    isInvalid(nameCtrl) {
        return nameCtrl.invalid && nameCtrl.touched;
    }

}
