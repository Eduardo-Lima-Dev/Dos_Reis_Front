export const fmtMoney = (n: number) =>
  `R$ ${n.toFixed(2).replace('.', ',')}`;

export const fmtMin = (n: number) => `${n} min`;
