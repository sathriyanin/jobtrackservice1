export class Customer {
    id!: string;
    name!: string;
    mobilenumber!: string;
    email!: string;
    status!: string;
    orgId!: string;

    constructor() {
        this.name = '';
        this.mobilenumber = '';
        this.email = '';
        this.orgId = '';
    }
}
