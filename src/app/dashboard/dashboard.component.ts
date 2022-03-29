import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray, } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  formArr: FormArray;
  formData: FormGroup;
  id;

  get formValid() {
    return this.formData?.valid
  }

  constructor(private formBuilder: FormBuilder) { }
  private createTableRow(): FormGroup {
    return this.formBuilder.group({
      id: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      }),
      name: new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(500)]
      }),
      price: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      }),
      description: new FormControl({
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      }),
      image: new FormControl({
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      }),
      link: new FormControl({
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      })
    });
  }

  ngOnInit(): void {


    this.formData = this.formBuilder.group({
      id: [""],
      name: ["", Validators.required],
      price: [""],
      description: [""],
      image: [""],
      link: [""],
      tableRowArray: this.formBuilder.array([
        this.createTableRow()
      ])
    });
    this.formData = this.formBuilder.group({
      Rows: this.formBuilder.array([this.initRows()])
    });
  }
  getControls() {
    return (this.formData.get('controlName') as FormArray).controls;
  }
  get formArr2() {
    return this.formData.get("Rows") as FormArray;
  }
  initRows() {
    return this.formBuilder.group({
      id: [""],
      name: ["", Validators.required],
      price: [""],
      description: [""],
      image: [""],
      link: [""],
    });
  }
  addNewRow() {
    this.formArr.push(this.initRows());
  }
  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    // console.table(this.form);
    console.table(this.formData.value);
    console.table(this.formArr.value);
    // console.table(this.formValue.value);
    // console.table(this.formValue);
    // console.log(this.formValue.get('name').value);
  }
}