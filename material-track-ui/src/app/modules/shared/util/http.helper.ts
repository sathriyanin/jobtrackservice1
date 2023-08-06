import { environment } from "src/environments/environment";

export class HttpHelper {

    static prefix = '/tracking/v1/api'

    static get getHttpUrl() {
        return `${environment.baseUrl}${this.prefix}`;
    }

    static get getEmployeeUrl() {
        return `${this.getHttpUrl}/employee`;
    }

    static get getCustomerUrl() {
        return `${this.getHttpUrl}/customer`;
    }

    static get getLoginUrl() {
        return `${this.getAuthUrl}/login`;
    }

    static get getTrackingLoginUrl() {
        return `${this.getAuthUrl}/client/login`;
    }

    static get getAuthUrl() {
        return `${this.getHttpUrl}/auth`;
    }
    static get getUserUrl() {
        return `${this.getHttpUrl}/user`;
    }
    static get getAdminUrl() {
        return `${this.getHttpUrl}/admin`;
    }

    static get getOrgUrl() {
        return `${this.getHttpUrl}/org`
    }
    static get getMachineUrl() {
        return `${this.getHttpUrl}/machine`
    }
    static get getWorkOrderUrl() {
        return `${this.getHttpUrl}/workorder`
    }
    static get getAssignmentUrl() {
        return `${this.getHttpUrl}/assignment`
    }
}