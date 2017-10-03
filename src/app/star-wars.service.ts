import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { LogService } from './log.service';

@Injectable()
export class StarWarsService {
    private characters = [
        { name: 'Luke Skywalker', side: '' },
        { name: 'Darth Vader', side: '' }
    ];
    private logService: LogService;
    charactersChanged = new Subject<void>();

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

    getCharacterIndex(charInfo) {
        return this.characters.findIndex((char) => {
            return char.name === charInfo.name;
        });
    }

    onSideChosen(charInfo) {
        const index = this.getCharacterIndex(charInfo);
        this.characters[index].side = charInfo.side;
        this.charactersChanged.next();
        this.logService.writeLog('Changed side of ' + charInfo.name + '. New side: ' + charInfo.side);
    }

    addCharacter(name, side) {
        const submittedChar = { name: name, side: side };
        const index = this.getCharacterIndex(submittedChar);
        if (index === -1) {
            this.characters.push(submittedChar);
        } else {
            console.log('Character ' + name + ' already exists');
        }
    }
}
