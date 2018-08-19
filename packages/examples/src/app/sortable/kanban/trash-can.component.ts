import { Component, EventEmitter } from "@angular/core";
import { SkyhookDndService } from "angular-skyhook";
import { ItemTypes } from "./item-types";
import { DraggedItem } from "angular-skyhook-card-list";
import { Output } from "@angular/core";

@Component({
    selector: 'kanban-trash-can',
    template: `
    <div *ngIf="collect$|async as c" class="trash-can" [class.hidden]="!c.canDrop" [class.isOver]="c.isOver"
         [dropTarget]="target">
        <div>
            <i class="fas fa-trash-alt"></i>
            <span>Delete card by dropping here</span>
        </div>
        <div *ngIf="c.isOver && c.item" class="space" [ngStyle]="c.item.size.style()"></div>
    </div>
    `,
    styles: [`
    .fas { margin-right: 8px; }
    .trash-can {
        margin: 8px;
        padding: 8px;
        font-weight: 700;
        text-shadow: 1px 1px rgba(255,255,255,0.2);
        border-radius: 4px;
        border: 1px dashed #333;
        text-align: right;
    }
    .hidden {
        display: none;
    }
    .canDrop:not(.isOver) {
        opacity: 0.8;
    }
    .isOver {
        background: rgba(255, 255, 255, 0.4);
        transform-origin: 100% 100%;
        transform: scale(1.2);
    }
    `]
})
export class TrashCanComponent {
    @Output() dropped = new EventEmitter<DraggedItem>();
    target = this.dnd.dropTarget(ItemTypes.CARD, {
        drop: m => {
            const item = m.getItem() as DraggedItem;
            this.dropped.emit(item);
        }
    });
    collect$ = this.target.listen(m => ({
        canDrop: m.canDrop(),
        item: m.getItem(),
        isOver: m.isOver()
    }));
    constructor(private dnd: SkyhookDndService) { }
}