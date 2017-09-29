import { Injectable } from '@angular/core';

import { LogService } from './log.service';

@Injectable()
export class StarWarsService {
    private characters = [
        { name: 'Luke Skywalker', side: '' },
        { name: 'Darth Vader', side: '' }
    ];
    private logService: LogService;

    constructor(logService: LogService) {
        this.logService = logService;
     }

    getCharacters(chosenList) {
        if (chosenList === 'all') {
            return this.characters.slice();
        }

        return this.characters.filter((char) => {
            return char.side === chosenList;
        });
    }

    onSideChosen(charInfo) {
        const index = this.characters.findIndex((char) => {
            return char.name === charInfo.name;
        });
        this.characters[index].side = charInfo.side;
        this.logService.writeLog('Changed side of ' + charInfo.name + '. New side: ' + charInfo.side);
    }
}
