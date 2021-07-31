export class Hospital {
    name: string = '';
    clinicStatusUrl: string = '';
    csTableType: number = 0;
    csTableSelector: string = '';
    csFieldIds: number[] = [];
    csTableEnc: string = '';

    constructor(json: Hospital) {
    }
}
