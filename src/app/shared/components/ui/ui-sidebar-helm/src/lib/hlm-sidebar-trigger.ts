import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePanelLeft } from '@ng-icons/lucide';
import { HlmButton, provideBrnButtonConfig } from '../../../ui-button-helm/src';

import { HlmSidebarService } from './hlm-sidebar.service';

import { HlmIcon } from '../../../ui-icon-helm/src';

@Component({
	 
	selector: 'button[hlmSidebarTrigger]',
	changeDetection: ChangeDetectionStrategy.OnPush,

	imports: [HlmIcon, NgIcon],
	providers: [provideIcons({ lucidePanelLeft }), provideBrnButtonConfig({ variant: 'ghost', size: 'icon' })],
	template: `
		<ng-icon hlm name="lucidePanelLeft" size="sm"></ng-icon>
	`,
	hostDirectives: [
		{
			directive: HlmButton,
		},
	],
	host: {
		'data-sidebar': 'trigger',
		'data-slot': 'sidebar-trigger',
		'(click)': '_onClick()',
	},
})
export class HlmSidebarTrigger {
	private readonly _hlmBtn = inject(HlmButton);
	private readonly _sidebarService = inject(HlmSidebarService);

	constructor() {
		this._hlmBtn.setClass('h-7 w-7');
	}

	protected _onClick(): void {
		this._sidebarService.toggleSidebar();
	}
}
