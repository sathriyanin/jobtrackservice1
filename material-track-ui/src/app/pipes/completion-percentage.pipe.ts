import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'completionPercentage'
})
export class CompletionPercentagePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return `${value}%`;
  }

}
