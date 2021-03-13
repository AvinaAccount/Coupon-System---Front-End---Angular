import { Location } from '@angular/common';
import { CompanyService } from './../../company.service';
import { Component, Input, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/coupon.model';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-company-coupons-page',
  templateUrl: './company-coupons-page.component.html',
  styleUrls: ['./company-coupons-page.component.css'],
  providers: [CompanyService]
})
export class CompanyCouponsPageComponent implements OnInit {
  coupons: Coupon[]
  @Input() coupon: Coupon
  selectedCoupon: string

  constructor(
    private location: Location,
    private companyService: CompanyService,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => { this.selectedCoupon = params['id'] })
    this.companyService.fetchCouponById(this.selectedCoupon)
    this.companyService.selectedCoupon.subscribe(
      (coupon: Coupon) => { this.coupon = coupon })   
   
    console.log(this.coupons);
  }

  

  onclickDelete() {
    this.companyService.removeCompanyCouponById(this.coupon.id.toString())
    this.backClicked()
  }

  backClicked() {
    this.location.back()
  }

}
