import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConversionEngineService } from '../../shared/conversion-engine.service';

@Component({
  selector: 'app-category-icon',
  templateUrl: './category-icon.component.html',
  styleUrl: './category-icon.component.css',
})
export class CategoryIconComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  // fontIcon is needed to change icon dynamically
  @Input() fontIcon!: string;

  constructor(private conversionEngineService: ConversionEngineService) {}

  ngOnInit(): void {
    // When category is changed, change the shown icon also
    this.parentForm.get('categoryValue')?.valueChanges.subscribe(() => {
      let catName = this.parentForm.get('categoryValue')?.value;
      let newIcon = this.conversionEngineService.getIconName(catName);
      this.fontIcon = newIcon;
    });
  }
}
