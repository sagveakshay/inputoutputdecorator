import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-child-component',
  templateUrl: './child-component.component.html',
  styleUrls: ['./child-component.component.css']
})
export class ChildComponentComponent implements OnInit {
  @Input() parentData: any;
  @Input() parentPayload: any;
  @Output() childEvent = new EventEmitter<string>()
  @Output() childFrom = new EventEmitter<any>()
  @Output() childFromPayload = new EventEmitter<any>()


  childVariable: string = "child component variable";
  childForm: FormGroup
  childformArray: any = []
  parentid: any

  hideEditBtn: boolean = false;
  hideSubmitBtn: boolean = true;
  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.childEvent.emit('hello parent component from child component')
    this.perpareForm()

  }

  getform() {
    return this.fb.control
  }

  perpareForm() {
    this.childForm = this.fb.group({
      firstname: [''],
      lastname: ['']
    })
  }


  submitChildFrom(type: string) {
    debugger
    if (type == 'submit') {
      let payload = {
        firstname: this.childForm.value.firstname,
        lastname: this.childForm.value.lastname
      }
      this.childformArray.push(payload)


    }
    else {
      this.childformArray[this.parentid].firstname = this.childForm.value.firstname
      this.childformArray[this.parentid].lastname = this.childForm.value.lastname
      this.hideSubmitBtn = true
      this.hideEditBtn = false

    }
    this.childFrom.emit(this.childformArray)
    this.childForm.reset()


  }

  ngOnChanges(changes: SimpleChanges) {
    debugger
    if (this.parentPayload) {
      this.hideSubmitBtn = false
      this.hideEditBtn = true
      this.parentid = this.parentPayload?.id
      this.childForm.get('firstname').setValue(this.parentPayload?.firstname)
      this.childForm.get('lastname').setValue(this.parentPayload?.lastname)

    }

  }



}
