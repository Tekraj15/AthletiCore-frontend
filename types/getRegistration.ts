export interface Registration {
  id: string;
  playerId: string;
  playerName: string;
  playerEmail: string;
  age: number;
  phone: string;
  height: number; // in cm
  weight: number; // in kg
  rackHeight: number; // in cm
  preferredPosition: string;
  experience: string;
  medicalConditions: string;
  emergencyContact: string;
  emergencyPhone: string;
  status: "pending" | "accepted" | "rejected";
  submittedAt: string;
  updatedAt: string;
  reviewedBy?: string;
  reviewComments?: string;
  auditLog: AuditEntry[];
}

export interface AuditEntry {
  id: string;
  action: string;
  performedBy: string;
  performedAt: string;
  details: string;
  oldValues?: Record<string, any>;
  newValues?: Record<string, any>;
}

export interface RegistrationFormData {
  playerName: string;
  age: number;
  phone: string;
  height: number;
  weight: number;
  rackHeight: number;
  preferredPosition: string;
  experience: string;
  medicalConditions: string;
  emergencyContact: string;
  emergencyPhone: string;
}

export class RegistrationService {
  private static registrations: Registration[] = [
    {
      id: "1",
      playerId: "1",
      playerName: "John Smith",
      playerEmail: "player@test.com",
      age: 28,
      phone: "+1 (555) 123-4567",
      height: 175,
      weight: 83,
      rackHeight: 185,
      preferredPosition: "Squat Specialist",
      experience: "5 years competitive",
      medicalConditions: "None",
      emergencyContact: "Jane Smith",
      emergencyPhone: "+1 (555) 987-6543",
      status: "pending",
      submittedAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-15T10:30:00Z",
      auditLog: [
        {
          id: "1",
          action: "Registration Submitted",
          performedBy: "John Smith",
          performedAt: "2024-01-15T10:30:00Z",
          details: "Initial registration submission",
        },
      ],
    },
    {
      id: "2",
      playerId: "3",
      playerName: "Mike Wilson",
      playerEmail: "mike.wilson@email.com",
      age: 32,
      phone: "+1 (555) 234-5678",
      height: 180,
      weight: 105,
      rackHeight: 190,
      preferredPosition: "All-around",
      experience: "8 years competitive",
      medicalConditions: "Previous knee injury (cleared)",
      emergencyContact: "Lisa Wilson",
      emergencyPhone: "+1 (555) 876-5432",
      status: "accepted",
      submittedAt: "2024-01-14T14:20:00Z",
      updatedAt: "2024-01-16T09:15:00Z",
      reviewedBy: "Sarah Johnson",
      reviewComments:
        "Excellent experience and form. Approved for competition.",
      auditLog: [
        {
          id: "2",
          action: "Registration Submitted",
          performedBy: "Mike Wilson",
          performedAt: "2024-01-14T14:20:00Z",
          details: "Initial registration submission",
        },
        {
          id: "3",
          action: "Status Updated",
          performedBy: "Sarah Johnson",
          performedAt: "2024-01-16T09:15:00Z",
          details: "Status changed from pending to accepted",
          oldValues: { status: "pending" },
          newValues: {
            status: "accepted",
            reviewComments:
              "Excellent experience and form. Approved for competition.",
          },
        },
      ],
    },
  ];

  static async getPlayerRegistration(
    playerId: string
  ): Promise<Registration | null> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return this.registrations.find((reg) => reg.playerId === playerId) || null;
  }

  static async getAllRegistrations(): Promise<Registration[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [...this.registrations];
  }

  static async submitRegistration(
    playerId: string,
    playerEmail: string,
    data: RegistrationFormData
  ): Promise<Registration> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const existingIndex = this.registrations.findIndex(
      (reg) => reg.playerId === playerId
    );

    const registration: Registration = {
      id:
        existingIndex >= 0
          ? this.registrations[existingIndex].id
          : Date.now().toString(),
      playerId,
      playerEmail,
      ...data,
      status: "pending",
      submittedAt:
        existingIndex >= 0
          ? this.registrations[existingIndex].submittedAt
          : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      auditLog:
        existingIndex >= 0
          ? [...this.registrations[existingIndex].auditLog]
          : [],
    };

    const auditEntry: AuditEntry = {
      id: Date.now().toString(),
      action:
        existingIndex >= 0 ? "Registration Updated" : "Registration Submitted",
      performedBy: data.playerName,
      performedAt: new Date().toISOString(),
      details:
        existingIndex >= 0
          ? "Player updated registration details"
          : "Initial registration submission",
      ...(existingIndex >= 0 && {
        oldValues: this.registrations[existingIndex],
        newValues: registration,
      }),
    };

    registration.auditLog.push(auditEntry);

    if (existingIndex >= 0) {
      this.registrations[existingIndex] = registration;
    } else {
      this.registrations.push(registration);
    }

    return registration;
  }

  static async updateRegistrationStatus(
    registrationId: string,
    status: "accepted" | "rejected",
    reviewComments: string,
    reviewedBy: string
  ): Promise<Registration> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const index = this.registrations.findIndex(
      (reg) => reg.id === registrationId
    );
    if (index === -1) {
      throw new Error("Registration not found");
    }

    const oldRegistration = { ...this.registrations[index] };

    this.registrations[index] = {
      ...this.registrations[index],
      status,
      reviewComments,
      reviewedBy,
      updatedAt: new Date().toISOString(),
    };

    const auditEntry: AuditEntry = {
      id: Date.now().toString(),
      action: "Status Updated",
      performedBy: reviewedBy,
      performedAt: new Date().toISOString(),
      details: `Status changed from ${oldRegistration.status} to ${status}`,
      oldValues: {
        status: oldRegistration.status,
        reviewComments: oldRegistration.reviewComments,
      },
      newValues: { status, reviewComments },
    };

    this.registrations[index].auditLog.push(auditEntry);

    return this.registrations[index];
  }

  static async updateRegistrationData(
    registrationId: string,
    updates: Partial<RegistrationFormData>,
    updatedBy: string
  ): Promise<Registration> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const index = this.registrations.findIndex(
      (reg) => reg.id === registrationId
    );
    if (index === -1) {
      throw new Error("Registration not found");
    }

    const oldRegistration = { ...this.registrations[index] };

    this.registrations[index] = {
      ...this.registrations[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    const auditEntry: AuditEntry = {
      id: Date.now().toString(),
      action: "Data Updated",
      performedBy: updatedBy,
      performedAt: new Date().toISOString(),
      details: `Registration data updated by official`,
      oldValues: updates,
      newValues: updates,
    };

    this.registrations[index].auditLog.push(auditEntry);

    return this.registrations[index];
  }
}
