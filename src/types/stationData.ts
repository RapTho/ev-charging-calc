export interface StationData {
  StationID: string;
  StationName: string;
  DateTime: string; // ISO 8601 format
  StartTime: string; // ISO 8601 format
  Durration: number; // wrongly spelled by providing API
  Consumption: number;
  PriceConsumption: number;
  PriceParkingTime: number;
  PriceUnit: string;
  StationUserID: number; // maybe use bigint
  PublicKey: string;
  SignedTransaction: string;
  ConnectorId: number;
}
