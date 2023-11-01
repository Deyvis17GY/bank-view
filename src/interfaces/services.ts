export interface IUser {
  firstName: string
  lastName: string
  email?: string
  password?: string
  userId?: number
  token?: string
}

export interface ILoginResponse {
  data: IUser
}

export interface ITokenData {
  token: string
}

export interface IListBankResponse {
  count: number
  next: null
  previous: null
  results: BankInfo[]
}

export interface BankInfo {
  id: number
  name: string
  type: ResultType
  code: null | string
  website: null
  display_name: string
  country_code: CountryCode
  country_codes: CountryCode[]
  primary_color: PrimaryColor
  logo: null | string
  icon_logo: null | string
  text_logo: null | string
  form_fields: FormField[]
  features: Feature[]
  integration_type: IntegrationType
  status: Status
  resources: string[]
  openbanking_information: null
}

export enum CountryCode {
  Br = 'BR',
  Co = 'CO',
  MX = 'MX'
}

export interface Feature {
  name: string
  description: string
}

export interface FormField {
  name: Name
  type: FormFieldType
  label?: string
  validation?: Validation
  placeholder?: string
  validation_message?: string
  length?: string
  optional?: boolean
  values?: Value[]
  pre_selected?: number
  value?: string
}

export enum Name {
  Password = 'password',
  Password2 = 'password2',
  Token = 'token',
  Username = 'username',
  Username2 = 'username2',
  UsernameType = 'username_type'
}

export enum FormFieldType {
  Hidden = 'hidden',
  Number = 'number',
  Password = 'password',
  Select = 'select',
  Text = 'text'
}

export enum Validation {
  AZ4096AZ6AZ092$ = '^([A-Z]{4})([0-9]{6})([A-Z]{6})([A-Z0-9]{2})$',
  AZAZ09_116$ = '^[a-zA-Z0-9_]{1,16}$',
  D6$ = '^\\d{6}$',
  The09115$ = '^[0-9]{1,15}$',
  The0916$ = '^[0-9]{1,6}$',
  The1$ = '^.{1,}$'
}

export interface Value {
  code: string
  label: string
  validation: Validation
  validation_message: string
  placeholder: string
}

export enum IntegrationType {
  Credentials = 'credentials'
}

export enum PrimaryColor {
  The056Dae = '#056dae',
  The0Ab0D8 = '#0AB0D8'
}

export enum Status {
  Healthy = 'healthy'
}

export enum ResultType {
  Bank = 'bank',
  Employment = 'employment',
  Fiscal = 'fiscal'
}
export interface ILinkCreateResponse {
  id: string
  institution: string
  access_mode: string
  status: string
  refresh_rate: string
  created_by: string
  last_accessed_at: Date
  external_id: null
  created_at: Date
  institution_user_id: string
  credentials_storage: string
  stale_in: null
  fetch_historical: boolean
  fetch_resources: any[]
}

export interface IListTransactionsResponse {
  count: number
  next: string
  previous: null
  results: Result[]
}

export interface Result {
  id: string
  account: Account
  created_at: Date
  category: null | string
  subcategory: null | string
  merchant: Merchant
  type: ResultType
  amount: number
  status: Status
  balance: number
  currency: string
  reference: string
  value_date: Date
  description: string
  collected_at: Date
  observations: null
  accounting_date: Date
  internal_identification: string
}

export interface Account {
  id: string
  link: string
  institution: Institution
  created_at: Date
  name: AccountName
  type: AccountType
  agency: null | string
  number: string
  balance: Balance
  category: Category
  currency: string
  loan_data: LoanData | null
  credit_data: CreditData | null
  balance_type: BalanceType
  collected_at: Date
  bank_product_id: string
  last_accessed_at: Date
  internal_identification: string
  public_identification_name: PublicIdentificationNameEnum
  public_identification_value: string
  funds_data?: FundsDatum[]
}

export interface Balance {
  current: number
  available: number
}

export enum BalanceType {
  Asset = 'ASSET',
  Liability = 'LIABILITY'
}

export enum Category {
  CheckingAccount = 'CHECKING_ACCOUNT',
  CreditCard = 'CREDIT_CARD',
  LoanAccount = 'LOAN_ACCOUNT',
  PensionFundAccount = 'PENSION_FUND_ACCOUNT'
}

export interface CreditData {
  collected_at: Date
  credit_limit: number
  cutting_date: Date
  interest_rate: number
  minimum_payment: number
  monthly_payment: number
  last_payment_date: Date
  next_payment_date: Date
  last_period_balance: number
  no_interest_payment: number
}

export interface FundsDatum {
  name: FundsDatumName
  type: FundsDatumType
  balance: number
  percentage: number
  collected_at: Date
  public_identifications: PublicIdentification[]
}

export enum FundsDatumName {
  CicloDeVida2030I = 'CICLO DE VIDA 2030 I',
  Estrategia2025Ii = 'ESTRATEGIA 2025 II',
  FixX = 'FIX X',
  MultiDinamicoV = 'MULTI DINAMICO V',
  MultiestrategiaIi = 'MULTIESTRATEGIA II',
  PremiumIii = 'PREMIUM III'
}

export interface PublicIdentification {
  name: PublicIdentificationName
  value: ValueId
}

export enum PublicIdentificationName {
  Cnpj = 'CNPJ',
  Susep = 'SUSEP'
}

export enum ValueId {
  The11111222222333344 = '11111.222222/3333-44',
  The11222333444401 = '11.222.333/4444-01',
  The11222333444402 = '11.222.333/4444-02',
  The11222333444403 = '11.222.333/4444-03',
  The11222333444404 = '11.222.333/4444-04',
  The11222333444405 = '11.222.333/4444-05',
  The11222333444406 = '11.222.333/4444-06',
  The11222333444407 = '11.222.333/4444-07',
  The11222333444408 = '11.222.333/4444-08',
  The11222333444409 = '11.222.333/4444-09',
  The11222333444410 = '11.222.333/4444-10'
}

export enum FundsDatumType {
  Pgbl = 'PGBL'
}

export interface Institution {
  name: InstitutionName
  type: InstitutionType
}

export enum InstitutionName {
  EreborBrRetail = 'erebor_br_retail'
}

export enum InstitutionType {
  Bank = 'bank'
}

export interface LoanData {
  fees: null
  limit_day: string
  loan_type: null
  principal: null
  limit_date: Date
  cutting_day: string
  collected_at: Date
  credit_limit: number
  cutting_date: Date
  interest_rate: null
  interest_rates: null
  contract_number: null
  monthly_payment: null
  payment_due_day: null
  last_payment_date: Date
  next_payment_date: Date
  contract_start_date: null
  last_period_balance: null
  no_interest_payment: null
  outstanding_balance: null
  outstanding_principal: null
  number_of_installments_total: null
  number_of_installments_outstanding: null
}

export enum AccountName {
  CartãoCréditoMastercardElite = 'Cartão crédito mastercard elite',
  CartãoCréditoVisaPlatinum = 'Cartão crédito visa platinum',
  ContaCorrente = 'Conta corrente',
  VgblCompensavel = 'VGBL - COMPENSAVEL'
}

export enum PublicIdentificationNameEnum {
  AccountNumber = 'ACCOUNT_NUMBER',
  Clabe = 'CLABE',
  CreditCardNumber = 'CREDIT_CARD_NUMBER',
  PensionPlanID = 'PENSION_PLAN_ID'
}

export enum AccountType {
  Contas = 'Contas',
  CréditoPessoal = 'Crédito pessoal',
  Progressiva = 'PROGRESSIVA'
}

export interface Merchant {
  logo: string
  name: string
  website: string
}

export enum Status {
  Pending = 'PENDING',
  Processed = 'PROCESSED'
}

export enum ResultType {
  Inflow = 'INFLOW',
  Outflow = 'OUTFLOW'
}
