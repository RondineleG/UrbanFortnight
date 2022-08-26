export type TerminalModel= {
  idTerminal: number,
  nameTerminal: string,
  cnpjTerminal: string,
  cityIdCity: number,
  city?: {
    idCity: number,
    nameCity: string,
    state?: {
      idState: number,
      nameState: string,
      country?: {
        idCountry: number,
        nameCountry: string,
      }
    }
  }, 
  addressTerminal: string,
  specificInstructionTerminal?: string,
  generalObservationTerminal?: string,
  activeTerminal: boolean,
  stateRegistrationTerminal?: string,
  municipalRegistrationTerminal?: string,
  zipcodeTerminal?: string,
};

export const initalState = {
  idTerminal: null,
  nameTerminal: null,
  cnpjTerminal: null,
  cityIdCity: null,
  city: null,
  addressTerminal: null,
  specificInstructionTerminal:  null,
  generalObservationTerminal:  null,
  activeTerminal: true,
  stateRegistrationTerminal: null,
  municipalRegistrationTerminal: null,
  zipcodeTerminal: null,
};

export type SelectOptionsModel = {
id: string,
value: number,
label: string
};

export type TerminalComponentModel = {
countriesOptions: SelectOptionsModel[],
};

export type FormHandlers = {
  editForm: boolean,
  countriesOptions: any,
  formData: TerminalModel,
  handleChange: any,
  handleSelectCountry?: any,
  handleSelectState?: any,
  handleSelectCity?: any,
  handleSelectFiscalEnv?: any,
  validated: boolean,
  selectHooks?: {countrySelected: any, setCountry: any, stateSelected: any, setState: any, statesOptions: any, cityOptions: any}
}
export type ListProps = {
  terminalList: any,
  onAddClick: any,
  handleRowClick: any,
}