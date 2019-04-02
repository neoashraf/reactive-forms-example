import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent implements OnInit {

  profileForm: FormGroup;

  // get form controls
  get skills() {
    return this.profileForm.get('skills') as FormArray;
  }

  get employmentHistory() {
    return this.profileForm.get('employmentHistory') as FormArray;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(data?) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      address: this.fb.group({
        street: [''],
        city: [''],
        state: [''],
        zip: ['']
      }),
      // skills: this.fb.array([
      //   this.fb.control('')
      // ]),
      // employmentHistory: this.fb.array([
      //   this.fb.group({
      //     company: [''],
      //     designation: ['']
      //   })
      // ])
      skills: this.fb.array(this.populateSkills(data && data.skills ? data.skills : [])),
      employmentHistory: this.fb.array(
        this.populateEmployment(data && data.employmentHistory ? data.employmentHistory : [])
      )
    });
  }

  // load data in form array(one control only)
  populateSkills(data?): FormControl[] {
    if (data.length) {
      let skillsArray: any[] = [];
      for (let i = 0; i < data.length; i++) {
        skillsArray.push(
          this.fb.control(data[i])
        );
      }
      return skillsArray;
    } else {
      return [this.fb.control('')];
    }
  }

  // load data in form array(group)
  populateEmployment(data?): FormGroup[] {
    if (data.length) {
      let employmentHistory: any[] = [];
      for (let i = 0; i < data.length; i++) {
        employmentHistory.push(
          this.fb.group({
            company: data[i].company,
            designation: data[i].designation
          })
        );
      }
      return employmentHistory;
    } else {
      return [
        this.fb.group({
          company: [''],
          designation: ['']
        })
      ];
    }
  }

  // loads data in the form
  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street'
      }
    });

    this.initForm({
      skills: ['HTML', 'CSS', 'JavaScript'],
      employmentHistory: [
        {
          company: 'Selise',
          designation: 'Software Engineer'
        },
        {
          company: 'Pathao',
          designation: 'Software Engineer'
        }
      ]
    });
  }

  // add new control to form array
  addSkills() {
    this.skills.push(this.fb.control(''));
  }

  // add new group to form array
  addEmployment() {
    this.employmentHistory.push(
      this.fb.group({
        company: [''],
        designation: ['']
      })
    );
  }

  onSubmit() {
    console.warn(this.profileForm.value);
  }
}


// tricks
// return this.profileForm.get('employmentHistory') as FormGroup  ;
// {{ user.get('name').errors | json }}