import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConversionEngineService } from '../../shared/conversion-engine.service';

@Component({
  selector: 'app-conversion-output',
  templateUrl: './conversion-output.component.html',
  styleUrl: './conversion-output.component.css',
})
export class ConversionOutputComponent implements OnInit {
  @Input() parentForm!: FormGroup;

  conversionOutUnitText = 'Output';

  constructor(private conversionEngineService: ConversionEngineService) {}

  ngOnInit(): void {
    // On category change clear output field
    this.parentForm.get('categoryValue')?.valueChanges.subscribe(() => {
      this.conversionOutUnitText = 'Output';
      this.parentForm.get('conversionOutput')?.setValue('');
    });

    // On conversion input field change, calculate conversion
    // and finally set the calculated value to output field
    this.parentForm.get('conversionInput')?.valueChanges.subscribe((val) => {
      let catName = this.parentForm.get('categoryValue')?.value;
      let convName = this.parentForm.get('converterValue')?.value;
      if (val === null || (val !== '' && convName !== '')) {
        let outValue = this.conversionEngineService.convertValue(
          catName,
          convName,
          val,
        );
        this.parentForm.controls['conversionOutput'].setValue(outValue);
      }
    });
  }
}
