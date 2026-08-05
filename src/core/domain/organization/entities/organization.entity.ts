import ScammerEntity from "@/core/domain/scammer/entities/scammer.entity";
import ContactEntity from "@/core/domain/contact/entities/contact.entity";
import PaymentMethodEntity from "@/core/domain/payment-method/entities/payment-method.entity";

class OrganizationEntity {
  constructor(
    private readonly _id: string,
    private readonly _name: string,
    private readonly _description: string,
    private readonly _is_active: boolean,
    private readonly _scammers: ScammerEntity[] | null,
    private readonly _contacts: ContactEntity[] | null,
    private readonly _paymentMethods: PaymentMethodEntity[] | null,
  ) {}

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get description(): string {
    return this._description;
  }

  public get isActive(): boolean {
    return this._is_active;
  }

  public get scammers(): ScammerEntity[] | null {
    return this._scammers;
  }

  public get contacts(): ContactEntity[] | null {
    return this._contacts;
  }

  public get paymentMethods(): PaymentMethodEntity[] | null {
    return this._paymentMethods;
  }
}

export default OrganizationEntity;
