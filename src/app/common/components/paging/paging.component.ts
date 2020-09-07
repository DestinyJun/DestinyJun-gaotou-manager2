import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {PagingOption} from './paging.model';
import {PublicMethedService} from '../../tool/public-methed.service';

@Component({
  selector: 'rbi-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.less']
})
export class PagingComponent implements OnInit, OnChanges {

  @Input() public option = new PagingOption();
  @Output() public pageClick = new EventEmitter<number>();
  public totalPage: number;
  public nowPage: number;
  public showPaging = true;
  public skpPage: number;
  constructor() { }
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.option) {
      if (this.option.total === null || this.option.total === 0) {
        this.showPaging = false;
        return;
      }
      this.totalPage = Math.ceil(this.option.total / this.option.row);
      if ( Math.ceil(this.option.total / this.option.row) >= 1) {
        this.showPaging = true;
      }
      this.nowPage = this.option.nowpage;
    }
  }
  public pClick(): void {
    if (this.nowPage > 1) {
      this.nowPage = this.nowPage - 1;
      this.pageClick.emit(this.nowPage);
    }
  }
  public nClick(): void {
    if (this.nowPage < this.totalPage) {
      this.nowPage = this.nowPage + 1;
      this.pageClick.emit(this.nowPage);
    }
  }
  public firstClick(): void {
    this.nowPage = 1;
    this.pageClick.emit(this.nowPage);
  }
  public lastClick(): void {
    this.nowPage = this.totalPage;
    this.pageClick.emit(this.nowPage);
  }
  public appointPage(event): void {
    if (this.skpPage === undefined) {
      window.alert('请输入页码....');
      return;
    }
    if (event.keyCode) {
      if (event.keyCode === 13 || event.type === 'click') {
        if (Number(this.skpPage) > this.totalPage || Number(this.skpPage) <= 0 || this.skpPage === null) {
          alert('你的输入超过最大页数或格式有误');
        } else {
          this.nowPage = Number(this.skpPage);
          this.pageClick.emit(this.nowPage);
        }
      }
      return;
    }
    if (Number(this.skpPage) > this.totalPage || Number(this.skpPage) <= 0 || this.skpPage === null) {
      alert('你的输入超过最大页数或格式有误');
    } else {
      this.nowPage = Number(this.skpPage);
      this.pageClick.emit(this.nowPage);
    }
  }
  public  din(e): void {
      console.log(e);
  }
}
