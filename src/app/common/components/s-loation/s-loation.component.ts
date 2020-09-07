import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'rbi-s-loation',
  templateUrl: './s-loation.component.html',
  styleUrls: ['./s-loation.component.less']
})
export class SLoationComponent implements OnInit {
  @Input()
  public locationTitle: string;
  constructor() { }

  ngOnInit() {
  }

}
