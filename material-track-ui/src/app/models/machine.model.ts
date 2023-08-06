export class Machine {
    id!: string;
    name!: string;
    model!: string;
    orgId: string;
    status!: string;

    constructor() {
        this.name = '';
        this.model = '';
        this.orgId = '';
    }
}