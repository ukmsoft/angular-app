import { Component, OnInit } from '@angular/core';
import { ItemService } from '../shared/item.service';
import { ItemBean } from '../models/item-bean';
import { UserIdleService } from 'angular-user-idle';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public items: ItemBean[];

  constructor(private itemService: ItemService,
    private userIdleService: UserIdleService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.userIdleService.startWatching();
    this.userIdleService.onTimerStart().subscribe(count => console.log(count));
    this.userIdleService.onTimeout().subscribe(() => {
      console.log('Time is up!')
      this.authService.logout();
    });

    this.itemService.getItems().subscribe(
      items => {
        console.log(items);
        this.items = items;
      }
    )
  }

  onLogout(){
    this.authService.logout();
  }

}
