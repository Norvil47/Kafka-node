import mongoose from 'mongoose';
const { Schema } = mongoose;

export const TransactionSchema = new Schema({
  idTransaction: String,
  accountExternalIdDebit: String,
  accountExternalIdCredit: String,
  status: String,
  tranferTypeId: Number,
  value: Number,
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: Date,
});
