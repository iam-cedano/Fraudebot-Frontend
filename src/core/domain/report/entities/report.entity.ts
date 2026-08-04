import UserEntity from "@/core/domain/user/entities/user.entity";
import OrganizationEntity from "@/core/domain/organization/entities/organization.entity";
import ScammerEntity from "@/core/domain/scammer/entities/scammer.entity";
import ProductEntity from "@/core/domain/product/product.entity";

class ReportEntity {
  constructor(
    private readonly _id: string,
    private readonly _products: ProductEntity[] | null,
    private readonly _users: UserEntity[] | null,
    private readonly _organizations: OrganizationEntity[] | null	,
    private readonly _scammers: ScammerEntity[] | null,
    private readonly _title: string,
    private readonly _description: string,
    private readonly _was_successful: boolean,
    private readonly _is_active: boolean,
    private readonly _deleted_at: string | null,
    private readonly _created_at: Date,
    private readonly _updated_at: Date,
  ) {}

  public get id(): string {
    return this._id;
  }

  public get products(): ProductEntity[] | null {
    return this._products;
  }

  public get users(): UserEntity[] | null {
    return this._users;
  }

  public get organizations(): OrganizationEntity[] | null {
    return this._organizations;
  }

  public get scammers(): ScammerEntity[] | null {
    return this._scammers;
  }
  
  public get title(): string {
    return this._title;
  }

  public get description(): string {
    return this._description;
  }

  public get wasSuccessful(): boolean {
    return this._was_successful;
  }

  public get isActive(): boolean {
    return this._is_active;
  }

  public get deletedAt(): string | null {
    return this._deleted_at;
  }

  public get createdAt(): Date {
    return new Date(this._created_at);
  }

  public get updatedAt(): Date {
    return new Date(this._updated_at);
  }
}

export default ReportEntity;