export interface Secret {
    UUID: string;
    Key?: string;
    Data: string;
    Expire?: Date;
    Accessed?: Date;
    DeleteKey?: string;
    Created: Date;
}
