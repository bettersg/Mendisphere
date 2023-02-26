export enum IPCStatus {
  NotApproved,
  Approved,
  Pending,
}

export const IPCStatusViewMap: Map<IPCStatus, string> = new Map([
  [IPCStatus.Approved, "Yes"],
  [IPCStatus.NotApproved, "No"],
  [IPCStatus.Pending, "Pending"],
]);
