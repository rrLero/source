import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { TabComponent } from './tab.component';

@Component({
    selector: 'tabs',
    styles: [`
      a {
        cursor: pointer;
      }
    `],
    template: `
        <ul class="nav nav-tabs">
            <li *ngFor="let tab of tabs" (click)="selectTab(tab)" [class.active]="tab.active">
                <a>{{ tab.title }}</a>
            </li>
        </ul>
        <ng-content></ng-content>
    `
})
export class TabsComponent implements AfterContentInit {
    @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

    ngAfterContentInit() {
        let activeTabs = this.tabs.filter((tab) => tab.active);

        if (activeTabs.length === 0) {
            this.selectTab(this.tabs.first);
        }
    }

    selectTab(tab: TabComponent) {
        this.tabs.toArray().forEach(item => item.active = false);
        tab.active = true;
    }
}
