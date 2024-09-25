import { Component, ViewChild } from '@angular/core';
import { ChildComponentComponent } from './child-component/child-component.component';

@Component({
  selector: 'app-parent-component',
  templateUrl: './parent-component.component.html',
  styleUrls: ['./parent-component.component.css']
})
export class ParentComponentComponent {
  @ViewChild(ChildComponentComponent) childcomponent: ChildComponentComponent;


  parentVariable: any = "hello child from parent component";
  childVariable: string = ''
  listofChildForm: any[] = []
  parentpayload: any

  receiveMessage(event: any) {
    this.childVariable = event
  }


  ngAfterViewInit() {
    // alert(this.childcomponent.childVariable)
  }

  getChildForm(event) {
    debugger
    this.listofChildForm = event

  }

  deleteChildData(id: any) {
    debugger
    this.listofChildForm.splice(id, 1)

  }

  editChildData(id: any) {
    debugger
    this.parentpayload = {
      id: id,
      firstname: this.listofChildForm[id].firstname,
      lastname: this.listofChildForm[id].lastname

    }

  }

}
