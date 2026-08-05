class PaymentMethodEntity {
  constructor(
    private readonly _id: string,
    private readonly _organization_id: string | null,
    private readonly _scammer_id: string | null,
    private readonly _payment_type: number,
    private readonly _reference: string,
    private readonly _is_active: boolean,
  ) {}

  public get id(): string {
    return this._id;
  }

  public get organizationId(): string | null {
    return this._organization_id;
  }

  public get scammerId(): string | null {
    return this._scammer_id;
  }

  public get paymentType(): number {
    return this._payment_type;
  }

  public get reference(): string {
    return this._reference;
  }

  public get isActive(): boolean {
    return this._is_active;
  }
}

export default PaymentMethodEntity;
