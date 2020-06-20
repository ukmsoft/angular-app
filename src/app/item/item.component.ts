import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../shared/item.service';
import { ItemBean } from '../models/item-bean';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  public fieldsArray;
  public itemBean: ItemBean;
  public itemBeanForm: FormGroup;

  constructor(private route: ActivatedRoute, private itemService: ItemService) { }

  ngOnInit(): void {
    let input = {}
    this.route.paramMap.subscribe(params => {
      this.fieldsArray = this.createIterable(+params.get('num') * 2);
      for (let i = 1; i <= this.fieldsArray.length; i++) {
        input['input_' + i] = new FormControl('');
      }
      this.itemBeanForm = new FormGroup(input);
    });


  }

  createIterable(rowsCount): any[] {
    if (rowsCount) {
      return Array(rowsCount);
    }
    return Array(1);
  }

  onSubmit() {
    console.log('itemBeanForm', this.itemBeanForm.value);
  }

  onReset() {
    this.itemBeanForm.reset();
  }

}
