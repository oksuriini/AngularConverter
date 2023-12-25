import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-conversion-input',
  templateUrl: './conversion-input.component.html',
  styleUrl: './conversion-input.component.css',
})
export class ConversionInputComponent implements OnInit {
  @Input() parentForm!: FormGroup;

  inputValue!: string;

  ngOnInit(): void {
    this.parentForm.get('inputValue')?.valueChanges.subscribe((value) => {
      this.inputValue = value;
    });
  }
}
