import {computed, Directive, input, signal} from '@angular/core';
import {BrnButton} from '@spartan-ng/brain/button';
import {hlm} from '../../../ui-utils-helm/src';
import {cva, type VariantProps} from 'class-variance-authority';
import type {ClassValue} from 'clsx';
import {injectBrnButtonConfig} from './hlm-button.token';

export const buttonVariants = cva(
  'focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 cursor-default items-center justify-center gap-2 whitespace-nowrap text-base font-medium outline-none transition-all focus-visible:ring-[3px] data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_ng-icon]:pointer-events-none [&_ng-icon]:shrink-0 hover:cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-primary transition-colors duration-250 text-primary-foreground shadow-xs rounded-full font-semibold border-1 hover:bg-white hover:text-primary hover:border-primary',
        secondary: 'bg-secondary border-secondary-foreground transition-colors duration-250 text-secondary-foreground shadow-xs rounded-full font-semibold border-1 hover:text-secondary hover:bg-secondary-foreground',
        tertiary: 'bg-tertiary border border-tertiary rounded-full text-tertiary-foreground transition-colors duration-250 uppercase hover:bg-tertiary-foreground hover:text-tertiary',
        destructive:
          'bg-destructive shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 text-white',
        outline:
          'bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'px-5 py-3 has-[>ng-icon]:px-3',
        sm: 'h-8 gap-1.5 rounded-md px-3 has-[>ng-icon]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>ng-icon]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;

@Directive({
  selector: 'button[hlmBtn], a[hlmBtn]',
  exportAs: 'hlmBtn',
  hostDirectives: [{directive: BrnButton, inputs: ['disabled']}],
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmButton {
  public readonly userClass = input<ClassValue>('', {alias: 'class'});
  private readonly _config = injectBrnButtonConfig();
  public readonly variant = input<ButtonVariants['variant']>(this._config.variant);
  public readonly size = input<ButtonVariants['size']>(this._config.size);
  private readonly _additionalClasses = signal<ClassValue>('');
  protected readonly _computedClass = computed(() =>
    hlm(buttonVariants({variant: this.variant(), size: this.size()}), this.userClass(), this._additionalClasses()),
  );

  setClass(classes: string): void {
    this._additionalClasses.set(classes);
  }
}
