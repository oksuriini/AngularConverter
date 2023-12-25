import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-conversion-output',
  templateUrl: './conversion-output.component.html',
  styleUrl: './conversion-output.component.css',
})
export class ConversionOutputComponent implements OnInit {
  @Input() parentForm!: FormGroup;

  outputValue!: string;

  ngOnInit(): void {
    this.parentForm.get('inputValue')?.valueChanges.subscribe((value) => {
      this.outputValue = value;
    });
  }
}
