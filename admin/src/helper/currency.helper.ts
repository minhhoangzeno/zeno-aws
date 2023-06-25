export const FormatCurrency = (val: number) => {
  let currency = val.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
  return currency;
}