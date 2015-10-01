/// <reference path="SP.JSGrid.d.ts"/>

declare module SP {
    export class GanttControl {
        static WaitForGanttCreation(callack: (control: GanttControl) => void): void;
        static Instances: GanttControl[];
        static FnGanttCreationCallback: { (control: GanttControl): void }[];

        get_Columns(): SP.JsGrid.ColumnInfo[];
    }
}