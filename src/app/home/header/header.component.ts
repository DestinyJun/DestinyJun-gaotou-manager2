import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rbi-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  public remindShow = true;
  public messageShow = true;
  constructor() {}
  ngOnInit() {
  }
  public  eventClick(e): void {
    if (e.target.id === 'remind') {
      this.remindShow = false;
      this.messageShow = true;
    } else if (e.target.id === 'message') {
      this.remindShow = true;
      this.messageShow = false;
    }else  {
      this.remindShow = true;
      this.messageShow = true;
    }
  }
}
