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
// Define an interface for form fields
export interface FormFields {
  title: string;
  disabledCondition: boolean;
  description: string;
  btn1Title?: string;
  displayBtn1?: boolean;
  btn1Function: () => void;
  btn2Title?: string;
  displayBtn2?: boolean;
  btn2Function: () => void;
}

export interface TradeData {}
