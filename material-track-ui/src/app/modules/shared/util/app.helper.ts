import { FormGroup } from "@angular/forms";
import { WorkOrder, WorkOrderStatus, WorkOrderStepStatus } from "src/app/models/work-order.model";
import { environment } from "src/environments/environment";

export class AppHelper {
    static getStatusValue(status: any) {
        const obj = Object.assign({},WorkOrderStepStatus) as any;
        return obj[status];
    }
    static getWorkOrderStatusValue(status: any) {
        const obj = Object.assign({},WorkOrderStatus) as any;
        return obj[status];
    }

}