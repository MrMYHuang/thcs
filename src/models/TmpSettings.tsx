import { Clinic } from "./Clinic";

export class TmpSettings {
    fetchError: boolean = false;
    isLoading: boolean = false;
    dbUpdateDate: string = '';
    shareTextModal = { text: '', show: false };
    clinics: Clinic[] = [];
}
