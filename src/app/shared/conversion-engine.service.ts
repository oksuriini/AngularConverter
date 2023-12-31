import { Injectable } from '@angular/core';
import { ConversionDef } from './conversion-def.class';
import { ConverterCategoryDef } from './converter-category-def.class';

@Injectable({
  providedIn: 'root',
})
export class ConversionEngineService {
  weightDefs: ConversionDef[] = [
    new ConversionDef('kgs to lbs', 2.20462262, 0, 0, 'kg', 'lb'),
    new ConversionDef('lbs to kgs', 0.453592, 0, 0, 'lb', 'kg'),
    new ConversionDef('kgs to stones', 0.157473, 0, 0, 'kg', 'stone'),
    new ConversionDef('stones to kgs', 6.35029, 0, 0, 'stone', 'kg'),
  ];
  tempDefs: ConversionDef[] = [
    new ConversionDef('C to F', 9 / 5, 0, 32, 'C', 'F'),
    new ConversionDef('F to C', 5 / 9, -32, 0, 'F', 'C'),
    new ConversionDef('C to K', 1, 0, 273.15, 'C', 'K'),
    new ConversionDef('K to C', 1, 0, -273.15, 'K', 'C'),
  ];
  distanceDefs: ConversionDef[] = [
    new ConversionDef('Kms to Miles', 0.621371, 0, 0, 'Km', 'Mi'),
    new ConversionDef('Miles to Kms', 1.60934, 0, 0, 'Mi', 'Km'),
    new ConversionDef('Kms to Nautical Miles', 0.539957, 0, 0, 'Km', 'NMi'),
    new ConversionDef('Nautical Miles to Kms', 1.852, 0, 0, 'NMi', 'Km'),
  ];
  currencyDefs: ConversionDef[] = [
    new ConversionDef('EUR to USD', 1.11, 0, 0, 'EUR', 'USD'),
    new ConversionDef('USD to EUR', 0.9, 0, 0, 'USD', 'EUR'),
    new ConversionDef('EUR to SEK', 11.04, 0, 0, 'EUR', 'SEK'),
    new ConversionDef('SEK to EUR', 0.091, 0, 0, 'SEK', 'EUR'),
  ];

  categoryDefs: ConverterCategoryDef[] = [
    new ConverterCategoryDef('', 'block', []),
    new ConverterCategoryDef('Weight', 'scale', this.weightDefs),
    new ConverterCategoryDef('Temperature', 'thermostat', this.tempDefs),
    new ConverterCategoryDef('Distance', 'straighten', this.distanceDefs),
    new ConverterCategoryDef('Currency', 'euro', this.currencyDefs),
  ];

  conversionInput: string = '';
  outputValue: string = '';
  iconName: string = '';
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

  findConversionIndex(catName: string, convName: string): number {
    if (catName == '') return -1;
    let catIdx = this.findCategoryIndex(catName);
    if (catIdx === -1) return -1;
    let conversionDefs = this.categoryDefs[catIdx].conversions;

    for (let i = 0; i < conversionDefs.length; i++) {
      if (convName === conversionDefs[i].name) {
        return i;
      }
    }
    return -1;
  }

  getConversionDefs(catName: string): ConversionDef[] {
    let index = this.findCategoryIndex(catName);
    return this.categoryDefs[index].conversions;
  }

  getCurrentConversionDef(
    catName: string,
    convName: string,
  ): ConversionDef | null {
    let idx = this.findCategoryIndex(catName);
    let cIdx = this.findConversionIndex(catName, convName);
    if (idx >= 0 && cIdx >= 0) {
      return this.categoryDefs[idx].conversions[cIdx];
    }
    return null;
  }

  getIconName(catName: string): string {
    if (catName == '') return '';
    let catIdx = this.findCategoryIndex(catName);
    if (catIdx === -1) return '';
    let iconName = this.categoryDefs[catIdx].icon;
    return iconName;
  }

  convertValue(catName: string, convName: string, inputVal: number): string {
    let currentConverter = this.getCurrentConversionDef(catName, convName);
    if (currentConverter != null) {
      let outVal =
        (inputVal + currentConverter.preOffset) * currentConverter.coeff +
        currentConverter.postOffset;
      let retVal = outVal.toFixed(3);
      return retVal;
    }
    return '';
  }
}
