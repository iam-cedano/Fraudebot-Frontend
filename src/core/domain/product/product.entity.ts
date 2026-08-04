import CategoryEntity from "@/core/domain/category/entities/category.entity";

class ProductEntity {
    constructor(
        private readonly _id: string,
        private readonly _category: CategoryEntity,
        private readonly _name: string,
        private readonly _emoji: string
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

    public get category(): CategoryEntity {
        return this._category;
    }
}

export default ProductEntity;