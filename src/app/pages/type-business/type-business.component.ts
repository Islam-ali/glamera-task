import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-type-business',
  standalone: true,
  imports: [CommonModule, RouterModule , NgSelectModule,ReactiveFormsModule],
  templateUrl: './type-business.component.html',
  styleUrl: './type-business.component.scss'
})
export class TypeBusinessComponent {
  governments = [
    { id: 1, name: 'Cairo' },
    { id: 2, name: 'El dqahlia' },
    { id: 3, name: '6 October' },

  ];
  districts = [
    { id: 1, name: 'Nasr City' },
    { id: 2, name: 'Mansoura' },
    { id: 3, name: 'belqas' },

  ];
  socialMedia = [
    { icon: '../../../assets/facebook.png', name: 'Facebook' },
    { icon: '../../../assets/twitter.png', name: 'Twitter' },
  ]

  types:{id:number,name:string,img:string}[] = [
    {
      id: 1,
      name:'Salon',
      img: '../../../assets/images/Group 45.svg'
    },
    {
      id: 2,
      name:'Gym',
      img: '../../../assets/images/Group 46.svg'
    },
    {
      id: 3,
      name:'Spa',
      img: '../../../assets/images/Group 47.svg'
    },
    {
      id: 4,
      name:'Clinic',
      img: '../../../assets/images/Group 48.svg'
    }
  ];


  businessForm = this.fb.group({
    type: ['',Validators.required],
    selected: [[]],
    government: [null ,  Validators.required],
    District: [null ,  Validators.required],
    social: [null ,  Validators.required],
    radioform: [null , Validators.required],
  })
  constructor(private fb: FormBuilder, private router: Router) {


  }


  get f() {
    return this.businessForm.controls;
  };

  selelctItem(name: any) {
    let selectedValue:any = this.businessForm.get('selected')?.value || []
    if(selectedValue.includes(name)) {
      const index = selectedValue.indexOf(name);
      if(index || index === 0) {
        selectedValue.splice(index, 1)
      }
    } else {
      selectedValue.push(name);
    }
   }

   onSubmit() {

     if(this.businessForm.invalid) {
       return
      }
      localStorage.removeItem('business')
    this.router.navigate(['/success'])
  }
}
