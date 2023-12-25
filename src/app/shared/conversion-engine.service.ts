import { Injectable } from '@angular/core';
import { ConversionDef } from './conversion-def.class';
import { ConverterCategoryDef } from './converter-category-def.class';

@Injectable({
  providedIn: 'root',
})
export class ConversionEngineService {
  weightDefs: ConversionDef[] = [
    new ConversionDef('kgs to lbs', 'kg', 'lb'),
    new ConversionDef('lbs to kgs', 'lb', 'kg'),
    new ConversionDef('kgs to stones', 'kg', 'stone'),
    new ConversionDef('stones to kgs', 'stone', 'kg'),
  ];
  tempDefs: ConversionDef[] = [
    new ConversionDef('C to F', 'C', 'F'),
    new ConversionDef('F to C', 'F', 'C'),
  ];
  distanceDefs: ConversionDef[] = [
    new ConversionDef('Kms to Miles', 'Km', 'Mi'),
    new ConversionDef('Miles to Kms', 'Mi', 'Km'),
    new ConversionDef('Kms to Nautical Miles', 'Km', 'NMi'),
    new ConversionDef('Nautical Miles to Kms', 'NMi', 'Km'),
  ];
  currencyDefs: ConversionDef[] = [
    new ConversionDef('EUR to USD', 'EUR', 'USD'),
    new ConversionDef('USD to EUR', 'USD', 'EUR'),
    new ConversionDef('EUR to SEK', 'EUR', 'SEK'),
    new ConversionDef('SEK to EUR', 'SEK', 'EUR'),
  ];

  categoryDefs: ConverterCategoryDef[] = [
    new ConverterCategoryDef('', '', []),
    new ConverterCategoryDef('Weight', '', this.weightDefs),
    new ConverterCategoryDef('Temperature', '', this.tempDefs),
    new ConverterCategoryDef('Distance', '', this.distanceDefs),
    new ConverterCategoryDef('Currency', '', this.currencyDefs),
  ];

  inputValue: string = '';
  outputValue: string = this.inputValue;
  constructor() {}

  getConverterCategoryDefs() {
    return this.categoryDefs;
  }
  findCategoryIndex(categoryName: string) {
    for (let i = 0; this.categoryDefs.length; ++i) {
      if (categoryName === this.categoryDefs[i].name) return i;
    }
    return -1;
  }

  getConversionDefs(catName: string): ConversionDef[] {
    let index = this.findCategoryIndex(catName);
    return this.categoryDefs[index].conversions;
  }
}
