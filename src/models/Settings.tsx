import { Bookmark } from "./Bookmark";

export class Settings {
    version: number = 1;
    hasAppLog: boolean = true;
    theme: number = 0;
    uiFontSize: number = 24;
    textFontSize: number = 24;
    countyIdSel: number = 0;
    hospitalIdSel: number = 0;
    bookmarks: Bookmark[] = [];
}
