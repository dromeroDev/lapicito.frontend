import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitCaracters',
})
export class LimitCaractersPipe implements PipeTransform {
  transform(value: string, ...args: string[]): string {
    return value.substring(0, 70) + '...';
  }
}
