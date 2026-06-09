class ScammerEntity {
    constructor(private id: string, private name: string, private iso_country: string, private is_active: boolean) {}

    public getId(): string {
        return this.id;
    }
    
    public getName(): string {
        return this.name;
    }
    
    public getIsoCountry(): string {
        return this.iso_country;
    }
    
    public getIsActive(): boolean {
        return this.is_active;
    }
}   

export default ScammerEntity;