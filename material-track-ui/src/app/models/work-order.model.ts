
export enum WorkOrderStatus {
    OPEN='OPEN',
    ACTIVE='ACTIVE',
    INACITVE='INACITVE'
}
export enum WorkOrderStepStatus {
    OPEN='OPEN',
    IN_PROGRESS='IN PROGRESS',
    COMPLETE='COMPLETE'
}
export class WorkOrder {
    id!: string;
    name: string = '';
    status: WorkOrderStatus = WorkOrderStatus.OPEN;
    steps: Step[] = []
}

export class Step {
    id!: string;
    name!: string;
    machineId!: String;
    position!: number;
    status!: WorkOrderStepStatus;
}

export class WorkOrderAssignment {
    id!: string;
    name: string = '';
    displayId!: string;
    workOrderId: string = '';
    assignedUserId: string = '';
    assignedBy: string = '';
    clientId: string = '';
    startDate: string = '';
    endDate: string = '';
    status: WorkOrderStatus = WorkOrderStatus.OPEN;
    currentStepId: string = '';
    currentStepStatus: string = '';
    steps: WorkOrderAssignmentStep[] = []
}

export class WorkOrderAssignmentStep extends Step {
    assignedUserId: string = '';
    remarks: string = ''
}