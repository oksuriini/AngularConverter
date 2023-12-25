import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-category-icon',
  templateUrl: './category-icon.component.html',
  styleUrl: './category-icon.component.css',
})
export class CategoryIconComponent implements OnInit {
  @Input() parentForm!: FormGroup;

  ngOnInit(): void {}
}
