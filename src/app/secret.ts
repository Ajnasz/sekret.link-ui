export interface Secret {
    ID?: string;
    Key?: string;
    Data: string;
    Expire?: Date;
    Accessed?: Date;
    Created: Date;
}
