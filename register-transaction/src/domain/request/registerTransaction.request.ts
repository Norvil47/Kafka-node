export class RegisterTransactionRequest {
  accountExternalIdDebit: string;
  idTransaction: string;
  accountExternalIdCredit: string;
  tranferTypeId: number;
  value: number;
}
