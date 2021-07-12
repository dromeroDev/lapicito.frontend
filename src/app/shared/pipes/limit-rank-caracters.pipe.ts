import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitRankCaracters',
})
export class LimitRankCaractersPipe implements PipeTransform {
  transform(value: string, ...args: string[]): string {
    return value.length > 20 ? value.substring(0, 20) + '...' : value;
  }
}
