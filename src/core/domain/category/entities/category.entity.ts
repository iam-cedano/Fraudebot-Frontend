class CategoryEntity {
    constructor(
        private readonly _id: string,
        private readonly _name: string,
        private readonly _emoji: string,
    ) {}

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get emoji(): string {
        return this._emoji;
    }
}

export default CategoryEntity;