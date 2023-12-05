export interface Trade {
  accountNumber: string;
  tradeDate: string;
  settlementDate: string;
  symbol: string;
  exchange: string;
  securityName: string;
  tradeType: string;
  brokerType: string;
  units: number;
  pricePerUnit: string;
  amount: string;
}
