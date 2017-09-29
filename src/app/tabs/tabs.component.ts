import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

    characters = [
        { name: 'Luke Skywalker', side: '' },
        { name: 'Darth Vader', side: '' }
    ];

    chosenList = 'all';

    constructor() { }

    ngOnInit() {
    }

    getCharacters() {
        if (this.chosenList === 'all') {
            return this.characters.slice();
        }

        return this.characters.filter((char) => {
            return char.side === this.chosenList;
        });
    }

    onChoose(side) {
        this.chosenList = side;
    }

    onSideAssigned(charInfo) {
        const index = this.characters.findIndex((char) => {
            return char.name === charInfo.name;
        });
        this.characters[index].side = charInfo.side;
    }

}
