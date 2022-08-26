import { useTranslation, withTranslation } from "next-i18next";
import MaskedInput from "@/components/shared/MaskedInput";
import { FormControlLabel, Switch } from '@material-ui/core';
import React, { FunctionComponent } from "react";
import { Col, Form, Nav, Row } from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Select from 'react-select';
import "models/TerminalTypes";
import { FormHandlers } from 'models/TerminalTypes';
import { cnpjMask,  nifMask, zipcodeElsewhereMask, zipcodeBrazilMask } from '@/utils/masks';

const FormTerminal:FunctionComponent<FormHandlers> = ({ editForm, countriesOptions, formData, handleChange, handleSelectCity,  handleSelectCountry, handleSelectState, validated, selectHooks }: FormHandlers): JSX.Element => {
  const { t } = useTranslation("terminal");

  const isInBrazil = () => {
    return (
      selectHooks.countrySelected !== null &&
      selectHooks.countrySelected.value === 39
    );
  };

  //#region Fields
  const idHiddenField = 
  <Form.Group
    controlId="idTerminal"
    onChange={handleChange} 
    hidden={true}
  >
    <Form.Control type="hidden" value={formData.idTerminal} />
  </Form.Group>;

  const NameField = 
    <Form.Group
      className="my-0 py-0"
      controlId="nameTerminal"
      onChange={handleChange}
      defaultValue={formData.nameTerminal}
    >
    <Form.Label className="my-0">
      {t("NameTerminalLabel")}
    </Form.Label>
    <Form.Control
      size="sm"
      required
      placeholder={t("nameTerminalPlaceholder")}
      className="p-0 m-0"
      type="text"
      maxLength={255}
      value={formData.nameTerminal}
      
    />
      <Form.Control.Feedback>
      {t("NameTerminalInvalidAlert")}  
      </Form.Control.Feedback>
    </Form.Group>;

  const cnpjField = 
  <Form.Group
    className="my-0 py-0"
    controlId="cnpjTerminal"
    onChange={handleChange}
    defaultValue={formData.cnpjTerminal}
  >
    <Form.Label className="my-0">
      {isInBrazil() ? t("CNPJTerminalLabel") : t("NifCodeLabel")}
    </Form.Label>
    <MaskedInput
      size="sm"
      className="p-0"
      mask={isInBrazil() ?  cnpjMask : nifMask}
      value={formData.cnpjTerminal}
      placeholder={isInBrazil() ? "CNPJ": "NIF"}
    />
    <Form.Control.Feedback>
    {t("CNPJTerminalInvalidAlert")}  
    </Form.Control.Feedback>
  </Form.Group>;

  const countryField =
  <Form.Group
    className="my-0 py-0"
    controlId="country"
  >
    <Form.Label className="my-0">
      {t("CountryLabel")}
    </Form.Label>
    <Select
      required
      size="sm"
      controlId="country"
      className="basic-single p-0 m-0"
      classNamePrefix="select"
      defaultValue={selectHooks.countrySelected}
      isSearchable={true}
      isClearable={true}
      clearValue={null}
      name={t("CountryLabel")}
      onChange={handleSelectCountry}
      options={countriesOptions}
    />
    <Form.Control.Feedback>
    {t("CountryInvalidAlert")}  
    </Form.Control.Feedback>
  </Form.Group>;

  const stateField = 
    <Form.Group
      className="my-0 py-0"
      controlId="state"
    >
      <Form.Label className="my-0">
        {t("StateLabel")}
      </Form.Label>
      <Select
        required
        controlId="state"
        className="basic-single p-0"
        classNamePrefix="select"
        isSearchable={true}
        isClearable={true}
        name={t("StateLabel")}
        clearValue={null}
        options={selectHooks.statesOptions}
        defaultValue={selectHooks.stateSelected}
        onChange={handleSelectState}
        isDisabled={selectHooks.countrySelected === null}
      />
      <Form.Control.Feedback>
      {t("StateInvalidAlert")}  
      </Form.Control.Feedback>
    </Form.Group>;

  const cityField = 
  <Form.Group
    className="my-0 py-0"
    controlId="city"
    onChange={handleSelectCity}
    defaultValue={formData.cityIdCity}
  >
    <Form.Label className="my-0">
      {t("CityLabel")}
    </Form.Label>
    <Select
      required
      controlId="cityIdCity"
      className="basic-single p-0"
      classNamePrefix="select"
      isSearchable={true}
      isClearable={true}
      name={t("CityLabel")}
      options={selectHooks.cityOptions}
      onChange={handleSelectCity}
      isDisabled={selectHooks.stateSelected == null}
      defaultValue={selectHooks.cityOptions.find(
        (c) => c.value === formData.cityIdCity
      )}
    />
    <Form.Control.Feedback>
    {t("StateInvalidAlert")}  
    </Form.Control.Feedback>
  </Form.Group>;

  const specificInstructionField = 
    <Form.Group
      className="my-0 py-0"
      controlId="specificInstructionTerminal"
      onChange={handleChange}
      defaultValue={formData.specificInstructionTerminal}
    >
      <Form.Label className="my-0">
        {t("specificInstructionTerminal")}
      </Form.Label>
      <Form.Control
        size="sm"
        placeholder={t("specificInstructionPlaceholder")}
        className="p-0"
        maxLength={100}
        type="text"
        value={formData.specificInstructionTerminal}
      />
      <Form.Control.Feedback>
      {t("SpecificInstructionTerminalInvalidAlert")}  
      </Form.Control.Feedback>
    </Form.Group>;

const generalObservationField = 
<Form.Group
  className="my-0 py-0"
  controlId="generalObservationTerminal"
  onChange={handleChange}
  defaultValue={formData.generalObservationTerminal}
>
  <Form.Label className="my-0">
    {t("generalObservationTerminalLabel")}
  </Form.Label>
  <Form.Control
    size="sm"
    placeholder={t("generalObservationPlaceholder")}
    className="p-0"
    maxLength={100}
    type="text"
    value={formData.generalObservationTerminal}
  />
  <Form.Control.Feedback>
  {t("GeneralObservationTerminalInvalidAlert")}  
  </Form.Control.Feedback>
</Form.Group>;

const addressField = 
<Form.Group
  className="my-0 py-0"
  controlId="addressTerminal"
  onChange={handleChange}
  defaultValue={formData.addressTerminal}
>
  <Form.Label className="my-0">
    {t("AddressTerminalLabel")}
  </Form.Label>
  <Form.Control
    size="sm"
    placeholder={t("addressPlaceholder")}
    required
    className="p-0"
    maxLength={255}
    type="text"
    value={formData.addressTerminal}
  />
  <Form.Control.Feedback>
  {t("AddressTerminalInvalidAlert")}  
  </Form.Control.Feedback>
</Form.Group>;

  const stateRegistrationField = 
    <Form.Group
      className="my-0 py-0"
      controlId="stateRegistrationTerminal"
      onChange={handleChange}
      defaultValue={formData.stateRegistrationTerminal}
    >
      <Form.Label className="my-0">
        {t("StateRegistrationTerminalLabel")}
      </Form.Label>
      <Form.Control
        size="sm"
        placeholder={t("stateRegistryPlaceholder")}
        className="p-0"
        type="text"
        maxLength={25}
        value={formData.stateRegistrationTerminal}
      />
      <Form.Control.Feedback>
      {t("StateRegistrationTerminalInvalidAlert")}  
      </Form.Control.Feedback>
    </Form.Group>;
  
  const municipalRegistrationField = 
    <Form.Group
      className="my-0 py-0"
      controlId="municipalRegistrationTerminal"
      onChange={handleChange}
      defaultValue={formData.municipalRegistrationTerminal}
    >
      <Form.Label className="my-0">
        {t("MunicipalRegistrationTerminalLabel")}
      </Form.Label>
      <Form.Control
        size="sm"
        placeholder={t("municipalRegistrationPlaceholder")}
        className="p-0"
        type="text"
        value={formData.municipalRegistrationTerminal}
        maxLength={25}
      />
      <Form.Control.Feedback>
      {t("MunicipalRegistrationTerminalInvalidAlert")}  
      </Form.Control.Feedback>
    </Form.Group>;
 

  const zipcodeField =
    <Form.Group
      className="my-0 py-0"
      controlId="zipcodeTerminal"
      onChange={handleChange}
      defaultValue={formData.zipcodeTerminal}
    >
      <Form.Label className="my-0">
        {isInBrazil() ? t("cepLabel") : t("ZipcodeTerminalLabel")}
      </Form.Label>
      <MaskedInput
        guide={false}
        mask={
          isInBrazil()
            ? zipcodeBrazilMask
            : zipcodeElsewhereMask
        }
        placeholder= {isInBrazil() ? t("cepPlaceholder") : t("zipcodePlaceholder")}
      size="sm"
      className="p-0 m-0"
      defaultValue={formData.zipcodeTerminal}
      />
      <Form.Control.Feedback>
      {t("ZipcodeTerminalInvalidAlert")}  
      </Form.Control.Feedback>
    </Form.Group>;
 
  const activeTerminalField =
    <Form.Group
      className="my-0 py-0"
      controlId="activeTerminal"
    >
        <Form.Label className="my-0">
          {t("ActiveTerminalLabel")}
        </Form.Label><br />
        <FormControlLabel
          control={
            <Switch
            id="activeTerminal"
            checked={formData.activeTerminal}
            onChange={handleChange}
            color="primary"
            required
            />
          }
          label={formData.activeTerminal ? t("active") : t("inactive")}
        />
        <Form.Control.Feedback>
          {t("ActiveTerminalInvalidAlert")}  
        </Form.Control.Feedback>
    </Form.Group>;
  //#endregion

  return (
    <Tab.Container defaultActiveKey="basic-info">
      <Form.Row>
      <Col sm={11}>
        <Tab.Content>
          <Tab.Pane eventKey="basic-info">
            <Form id="formTerminalAdd" validated={validated}>
              {editForm && idHiddenField}
            <Form.Row className="mb-1 mt-0">
              <Col xs={9}>
                {NameField}
              </Col>
              <Col xs={3}>
                {cnpjField}
              </Col>
              </Form.Row>
              
              <Form.Row className="mb-1 mt-0">
                <Col xs={4}>
                  {countryField}
                </Col>
                <Col xs={4}>
                  {stateField}
                </Col>
                <Col xs={4}>
                  {cityField}
                </Col>
              </Form.Row>

              <Form.Row className="mb-1 mt-0">
                <Col xs={12}>
                  {addressField}
                </Col>
              </Form.Row>          

              {/* Optional fields */}
              <Form.Row className="mb-1 mt-0">
                <Col xs={4}>
                  {stateRegistrationField}
                </Col>

                <Col xs={4}>
                  {municipalRegistrationField}
                </Col>

                <Col xs={4}>
                  {zipcodeField}
                </Col>

              </Form.Row>

              <Form.Row className="mb-1 mt-0">
                <Col xs={12}>
                  {specificInstructionField}
                </Col>
              </Form.Row>
              <Form.Row className="mb-1 mt-0">
                <Col xs={12}>
                  {generalObservationField}
                </Col>
              </Form.Row>

              <Form.Row className="mb-1 mt-0">
                <Col>
                  {activeTerminalField}
                </Col>
              </Form.Row>

            </Form>
          </Tab.Pane>
        </Tab.Content>
      </Col>
    </Form.Row>
  </Tab.Container>
  
);
}

export default withTranslation(["terminal", "common"])(FormTerminal);
