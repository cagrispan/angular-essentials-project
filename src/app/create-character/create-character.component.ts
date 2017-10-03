import { Component, OnInit } from '@angular/core';

import { StarWarsService } from '../star-wars.service';
import { LogService } from '../log.service';

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
    logService: LogService;

    constructor(starWarsService: StarWarsService, logService: LogService) {
        this.starWarsService = starWarsService;
        this.logService = logService;
    }

    ngOnInit() {
    }

    onSubmit(form) {
        if (form.invalid) {
            this.logService.writeLog('This form is invalid.');
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
