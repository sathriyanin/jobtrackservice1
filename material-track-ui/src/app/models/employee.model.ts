export class Employee {
    id!: string;
    firstname!: string;
    lastname!: string;
    mobilenumber!: string;
    email!: string;
    companyId!: string;
    roles!: UserRole;

    constructor() {
        this.firstname = '';
        this.lastname = '';
        this.mobilenumber = '';
        this.email = '';
        this.companyId = '';
        this.roles = new UserRole();
    }
}

export class UserRole {
    APPADMIN!: string;
    ADMIN!: string;
    USER = '0003';
    constructor() {
        this.USER = '0003';
    }
}

export enum UserRoleEnum {
    APPADMIN=1,
    ADMIN=2,
    USER=3
}