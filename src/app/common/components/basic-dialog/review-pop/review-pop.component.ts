import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'rbi-review-pop',
  templateUrl: './review-pop.component.html',
  styleUrls: ['./review-pop.component.less']
})
export class ReviewPopComponent implements OnInit {

  @Input()
  reviewOption: any;
  @Output()
  public event = new EventEmitter<any>();
  public reviewStatus = '通过';
  constructor() { }

  ngOnInit() {
  }

  public  SureClick(): void {
      this.event.emit(this.reviewStatus);
  }
  public closeClick(): void {
    console.log(234);
    this.event.emit('false');
  }
}
