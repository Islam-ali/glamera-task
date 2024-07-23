import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { NgOtpInputModule } from  'ng-otp-input';
// import { SwiperModule } from 'swiper/angular';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import { OnlyNumberDirective } from '../../core/directives/only-number.directive';


// import SwiperCore, {
//   SwiperOptions,
//   Pagination,
//   Navigation,
//   Autoplay,
// } from 'swiper';
// SwiperCore.use([Navigation, Pagination, Autoplay]);

@Component({
  selector: 'app-regestration',
  standalone: true,
  imports: [CommonModule ,
     ReactiveFormsModule ,
    NgOtpInputModule,
    NgbCarouselModule,
    OnlyNumberDirective,
    RouterModule
  ],
  templateUrl: './regestration.component.html',
  styleUrl: './regestration.component.scss'
})
export class RegestrationComponent {

  hide: boolean = true;

  private counterSubject = new BehaviorSubject<number>(60);
  counter$ = this.counterSubject.asObservable();
  private decrementSubscription: Subscription | undefined;

  constructor(private fb: FormBuilder, private router: Router , private modalService: NgbModal) { }

	open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
		);
	}

  registrationForm = this.fb.group({
    firstName: ["", [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z]+$/)]],
    lastName: ["", [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z]+$/)]],
    email: ["", [Validators.required, Validators.email,Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")]],
    phone: ["", [Validators.required, Validators.minLength(7), Validators.maxLength(12), Validators.pattern("^[0-9]*$")]],
    password: ["", [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$")]],
    checkbox: [false]

  })

  ngOnInit(): void {

  }
  get firstName() {
    return this.registrationForm.get('firstName')
  };

  get lastName() {
    return this.registrationForm.get('lastName')
  };

  get email() {
    return this.registrationForm.get('email')
  };
  get phone() {
    return this.registrationForm.get('phone')
  };
  get password() {
    return this.registrationForm.get('password')
  };



  startDecrement(intervalTime: number) {
    this.decrementSubscription = interval(intervalTime).subscribe(() => {
      const currentValue = this.counterSubject.getValue();
      if (currentValue > 0) {
        this.counterSubject.next(currentValue - 1);
      } else {
        this.stopDecrement();
      }
    });
  }

  stopDecrement() {
    if (this.decrementSubscription) {
      this.decrementSubscription.unsubscribe();
    }
  }

  submiteForm(content:any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
    this.startDecrement(1000);
  }
  onVerify() {
    localStorage.setItem('business', 'true');
    this.modalService.dismissAll();
    this.router.navigate(['/type-business']);
  }
  toggleShow() {
    this.hide = !this.hide;
  }
  ngOnDestroy() {
    this.stopDecrement();
  }
}
