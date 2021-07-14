import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitCaracters',
})
export class LimitCaractersPipe implements PipeTransform {
  transform(value: string, quantity: number): string {
    return value.length > quantity
      ? value.substring(0, quantity) + '...'
      : value;
  }
}
