export interface Secret {
    UUID?: string;
    Key?: string;
    Data: string;
    Expire?: Date;
    Accessed?: Date;
    Created: Date;
}
