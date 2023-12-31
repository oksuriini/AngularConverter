import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConversionEngineService } from '../../shared/conversion-engine.service';

@Component({
  selector: 'app-conversion-input',
  templateUrl: './conversion-input.component.html',
  styleUrl: './conversion-input.component.css',
})
export class ConversionInputComponent implements OnInit {
  @Input() parentForm!: FormGroup;

  conversionInUnitText = 'Input';
  constructor(private conversionEngineService: ConversionEngineService) {}

  ngOnInit(): void {
    // On category change, clear conversion input field
    this.parentForm.get('categoryValue')?.valueChanges.subscribe(() => {
      this.conversionInUnitText = 'Input';
      this.parentForm.get('conversionInput')?.setValue('');
    });

    // On converter change, clear input field's text to match converter
    this.parentForm
      .get('converterValue')
      ?.valueChanges.subscribe((convName) => {
        let catName = this.parentForm.get('categoryValue')?.value;
        if (catName != '') {
          let conversionDef =
            this.conversionEngineService.getCurrentConversionDef(
              catName,
              convName,
            );
          this.conversionInUnitText = 'Input as ' + conversionDef?.inUnit;
        }

        // If input field has value during converter change
        // reinput the value to field, so conversion is done
        // immediately after converter change
        if (this.parentForm.get('conversionInput')?.value !== '' || null) {
          this.parentForm
            .get('conversionInput')
            ?.setValue(this.parentForm.get('conversionInput')?.value);
        }
      });
  }
}
