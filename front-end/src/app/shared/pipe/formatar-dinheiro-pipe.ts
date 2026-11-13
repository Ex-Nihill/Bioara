import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatarDinheiro',
})
export class FormatarDinheiroPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
