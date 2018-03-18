import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    constructor(
        private userService: UserService
    ) { }

    ngOnInit() {
        this.userService.get().subscribe(
            c => console.log(c)
        );
    }

}
