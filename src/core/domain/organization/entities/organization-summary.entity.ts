class OrganizationSummaryEntity {
    constructor(
      private readonly _id: string,
      private readonly _name: string,
      private readonly _country: string,
      private readonly _profile_picture: string | null,
      private readonly _reports: number,
      private readonly _categories: string[], 
      private readonly _is_active: boolean,
      private readonly _created_at: Date,
      private readonly _updated_at: Date,
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

    public get profilePicture(): string | null {
      return this._profile_picture;
    }

    public get reports(): number {
      return this._reports;
    }

    public get categories(): string[] {
      return [...this._categories];
    }

    public get isActive(): boolean {
      return this._is_active;
    }

    public get createdAt(): Date {
      return new Date(this._created_at);
    }

    public get updatedAt(): Date {
      return new Date(this._updated_at);
    }

    
}

export default OrganizationSummaryEntity;