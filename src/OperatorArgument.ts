export enum OperatorArgument {
  Register = 1,
  Numeric = 2,
  String = 4,
  Address = 8,
  NumericOrRegister = Register | Numeric,
  Value = NumericOrRegister | String
}
