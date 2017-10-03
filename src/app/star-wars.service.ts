import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { LogService } from './log.service';

@Injectable()
export class StarWarsService {
    private characters = [
    ];
    private logService: LogService;
    charactersChanged = new Subject<void>();
    http: Http;

    constructor(logService: LogService, http: Http) {
        this.logService = logService;
        this.http = http;
    }

    fetchCharacters() {
        this.http.get('https://swapi.co/api/people/')
            .map((response: Response) => {
                const data = response.json();
                const extractedChars = data.results;
                const chars = extractedChars.map((char) => {
                    return { name: char.name, side: '' };
                });
                return chars;
            })
            .subscribe((data) => {
                this.populate(data);
                this.charactersChanged.next();
            });
    }

    populate(characters) {
        this.characters = characters;
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
            this.logService.writeLog('Character ' + name + ' already exists');
        }
    }
}
