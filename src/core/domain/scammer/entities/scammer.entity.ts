import ContactEntity from "@/core/domain/contact/entities/contact.entity";
import PaymentMethodEntity from "@/core/domain/payment-method/entities/payment-method.entity";
import OrganizationEntity from "@/core/domain/organization/entities/organization.entity";
import ReportEntity from "@/core/domain/report/entities/report.entity";

class ScammerEntity {
  constructor(
    private readonly _id: string,
    private readonly _name: string,
    private readonly _country: string,
    private readonly _is_active: boolean,
    private readonly _organizations: OrganizationEntity[] | null,
    private readonly _contacts: ContactEntity[] | null,
    private readonly _paymentMethods: PaymentMethodEntity[] | null,
    private readonly _reports: ReportEntity[] | null,
  ) {} 

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get country(): string {
    return this._country;
  }

  public get isActive(): boolean {
    return this._is_active;
  }

  public get organizations(): OrganizationEntity[] | null {
    return this._organizations;
  }

  public get contacts(): ContactEntity[] | null {
    return this._contacts;
  }

  public get paymentMethods(): PaymentMethodEntity[] | null {
    return this._paymentMethods;
  }

  public get reports(): ReportEntity[] | null {
    return this._reports;
  }
}

export default ScammerEntity;
