import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ConversionEngineService } from '../shared/conversion-engine.service';

@Component({
  selector: 'app-converter-ui',
  templateUrl: './converter-ui.component.html',
  styleUrl: './converter-ui.component.css',
})
export class ConverterUiComponent implements OnInit {
  parentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private conversionEngineService: ConversionEngineService,
  ) {}

  ngOnInit(): void {
    this.parentForm = this.fb.group({
      categoryValue: new FormControl(
        this.conversionEngineService.categoryDefs[0].name,
      ),
      converterValue: new FormControl(
        this.conversionEngineService.categoryDefs[0].conversions,
      ),
      inputValue: new FormControl(this.conversionEngineService.inputValue),
    });
  }

  onSubmit() {
    console.log(`Submit: ${JSON.stringify(this.parentForm.value)}`);
  }
}
