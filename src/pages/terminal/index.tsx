import { useTranslation } from "next-i18next";
import BaseLayout from "@/components/layout/BaseLayout";
import ModalAdd from "@/components/shared/Modal-Add";
import ModalEdit from "@/components/shared/Modal-Edit";
import { urlDefaultRegister } from "configuration/urlConfiguration";
import React, { useEffect, useState } from "react";
import { toastr } from "react-redux-toastr";
import {
  TerminalComponentModel,
  TerminalModel,
  initalState,
  SelectOptionsModel,
  FormHandlers as FormTerminal
} from "models/TerminalTypes";
//import FormTerminal from "@/components/pages/Terminal/TerminalFormLayout";
import ListTerminal from "../../modules/registers/terminals/list-terminal";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getServerSideProps({ locale }): Promise<Object> {
  const result = await fetch(`${urlDefaultRegister}/Register/Country`);
  const res = await result.json();
  const _countriesOptions: Array<SelectOptionsModel> = res.map(
    (_country: any) => {
      return {
        id: "countryIdCountry",
        value: _country.idCountry,
        label: _country.nameCountry,
      };
    }
  );
  return {
    props: {
      countriesOptions: _countriesOptions,
      ...(await serverSideTranslations(locale, ["terminal"])),
    },
  };
}

const getStatesByCountryOptions = async (
  id: number
): Promise<Array<SelectOptionsModel>> => {
  const result = await fetch(
    `${urlDefaultRegister}/Register/State/StatesByCountry/${id}`
  );
  const res = await result.json();
  const _statesOptions: Array<SelectOptionsModel> = res.map((_state: any) => {
    return {
      id: "stateIdState",
      value: _state.idState,
      label: _state.nameState,
    };
  });
  return _statesOptions;
};

const getCitiesByStateOptions = async (
  id: number
): Promise<Array<SelectOptionsModel>> => {
  const result = await fetch(
    `${urlDefaultRegister}/Register/City/CitiesByState/${id}`
  );
  const res = await result.json();
  const _citiesOptions: Array<SelectOptionsModel> = res.map((city: any) => {
    return {
      id: "cityIdCity",
      value: city.idCity,
      label: city.nameCity,
    };
  });
  return _citiesOptions;
};

const Terminal = ({ countriesOptions }: TerminalComponentModel) => {
  const { t } = useTranslation("terminal");

  const initialState: TerminalModel = initalState;

  const [terminals, setData] = useState([]);
  const [showAdd, setShowForAdd] = useState(false);
  const [showEdit, setShowForEdit] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [validated, setValidated] = useState(true);
  const [refresh, forceRefresh] = useState(false);

  // Country, State handlers hooks
  const [countrySelected, setCountry] = useState(null);
  const [stateSelected, setState] = useState(null);

  const [statesOptions, setStateOptions] = useState([]);
  const [cityOptions, setCitiesOptions] = useState([]);

  const reverseLocationLoad = async (city: any) => {
    const idState = city.state.idState;
    const idCountry = city.state.country.idCountry;

    const _statesOptions = await getStatesByCountryOptions(idCountry);
    const _citiesOptions = await getCitiesByStateOptions(idState);

    setStateOptions(_statesOptions);
    setCitiesOptions(_citiesOptions);

    setCountry(countriesOptions.find((c) => c.value === idCountry));
    setState(_statesOptions.find((s) => s.value === idState));
  };

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();
    fetch(`${urlDefaultRegister}/Register/Terminal`, {
      method: "POST",
      body: JSON.stringify({
        nameTerminal: formData.nameTerminal,
        cnpjTerminal: formData.cnpjTerminal,
        cityIdCity: formData.cityIdCity,
        addressTerminal: formData.addressTerminal,
        specificInstructionTerminal: formData.specificInstructionTerminal,
        generalObservationTerminal: formData.generalObservationTerminal,
        activeTerminal: formData.activeTerminal,
        stateRegistrationTerminal: formData.stateRegistrationTerminal,
        municipalRegistrationTerminal: formData.municipalRegistrationTerminal,
        zipcodeTerminal: formData.zipcodeTerminal,
      }),
      headers: {
        Accept: "application/json; charset=utf-8",
        "Content-Type": "application/json;charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.ok) {
          toastr.success(t("successMessage"));
          setShowForAdd(false);
          forceRefresh(!refresh);
        } else {
          toastr.error(t("errorMissingInformation"));
        }
      })
      .catch((error) => {
        toastr.error(t("internalErrorMessage"), error.message);
      });
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    if (id === "activeTerminal") {
      if (event.target.checked) {
        setFormData({ ...formData, [id]: true });
      } else {
        setFormData({ ...formData, [id]: false });
      }
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSelectCity = (event) => {
    const value = event === null ? null : event.value;
    setFormData({ ...formData, cityIdCity: value });
  };

  const handleSelectCountry = async (event) => {
    if (event === null) {
      setCountry(null);
      handleSelectState(null);
      setStateOptions([]);
    } else {
      const _states = await getStatesByCountryOptions(event.value);
      setCountry(countriesOptions.find((c) => c.value === event.value));
      handleSelectState(null);
      setStateOptions(_states);
    }
  };

  const handleSelectState = async (event) => {
    if (event === null) {
      setState(null);
    } else {
      const _cities = await getCitiesByStateOptions(event.value);
      const newState = statesOptions.find((s) => s.value === event.value);
      setState(newState);
      setCitiesOptions(_cities);
    }
  };

  function handleSubmitAndAddNew(event) {
    handleSubmit(event);
    setTimeout(function () {
      onAddClick();
    }, 1000);
  }

  const onAddClick = () => {
    setFormData(initialState);
    setValidated(false);
    setState(null);
    setCountry(null);
    setShowForAdd(true);
  };

  const handleSubmitForEdit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();
    fetch(`${urlDefaultRegister}/Register/Terminal`, {
      method: "PUT",
      body: JSON.stringify({
        idTerminal: formData.idTerminal,
        nameTerminal: formData.nameTerminal,
        cnpjTerminal: formData.cnpjTerminal,
        cityIdCity: formData.cityIdCity,
        addressTerminal: formData.addressTerminal,
        specificInstructionTerminal: formData.specificInstructionTerminal,
        generalObservationTerminal: formData.generalObservationTerminal,
        activeTerminal: formData.activeTerminal,
        stateRegistrationTerminal: formData.stateRegistrationTerminal,
        municipalRegistrationTerminal: formData.municipalRegistrationTerminal,
        zipcodeTerminal: formData.zipcodeTerminal,
      }),
      headers: {
        Accept: "application/json; charset=utf-8",
        "Content-Type": "application/json;charset=UTF-8",
      },
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          setShowForEdit(false);
          toastr.success(t("successMessage"));
          forceRefresh(!refresh);
        } else {
          toastr.error(t("errorMissingInformation"));
        }
      })
      .catch((error) => {
        toastr.error(t("internalErrorMessage"), error.message);
      });
  };

  const handleRowClick = (terminal: TerminalModel) => {
    setValidated(false);
    setFormData({
      idTerminal: terminal.idTerminal,
      nameTerminal: terminal.nameTerminal,
      cnpjTerminal: terminal.cnpjTerminal,
      cityIdCity: terminal.cityIdCity,
      city: terminal.city,
      addressTerminal: terminal.addressTerminal,
      specificInstructionTerminal: terminal.specificInstructionTerminal,
      generalObservationTerminal: terminal.generalObservationTerminal,
      activeTerminal: terminal.activeTerminal,
      stateRegistrationTerminal: terminal.stateRegistrationTerminal,
      municipalRegistrationTerminal: terminal.municipalRegistrationTerminal,
      zipcodeTerminal: terminal.zipcodeTerminal,
    });
    // city -> state -> country handler
    reverseLocationLoad(terminal.city).then(() => setShowForEdit(true));
  };

  useEffect(() => {
    async function fetchData() {
      const result = await fetch(`${urlDefaultRegister}/Register/Terminal`);
      const res = await result.json();
      setData(res);
    }
    fetchData();
  }, [refresh]);

  return (
    <BaseLayout>
      <ModalEdit
        title={t("editTerminal")}
        targetForm="formTerminalEdit"
        show={showEdit}
        onSave={handleSubmitForEdit}
        onCancel={() => setShowForEdit(false)}
      >
        {/*<FormTerminal
          editForm={true}
          countriesOptions={countriesOptions}
          formData={formData}
          handleChange={handleChange}
          handleSelectCountry={handleSelectCountry}
          handleSelectState={handleSelectState}
          handleSelectCity={handleSelectCity}
          validated={validated}
          selectHooks={{
            countrySelected,
            setCountry,
            stateSelected,
            setState,
            statesOptions,
            cityOptions,
          }}
        />*/}
      </ModalEdit>

      <ModalAdd
        show={showAdd}
        saveButtonName={t("saveTerminal")}
        title={t("newTerminal")}
        targetForm="formTerminal"
        onSave={handleSubmit}
        onSaveAndAddNew={handleSubmitAndAddNew}
        onCancel={() => setShowForAdd(false)}
      >
        {/*<FormTerminal
          editForm={false}
          countriesOptions={countriesOptions}
          formData={formData}
          handleChange={handleChange}
          handleSelectCountry={handleSelectCountry}
          handleSelectState={handleSelectState}
          handleSelectCity={handleSelectCity}
          validated={validated}
          selectHooks={{
            countrySelected,
            setCountry,
            stateSelected,
            setState,
            statesOptions,
            cityOptions,
          }}
        />*/}
      </ModalAdd>

      <ListTerminal
        terminalList={terminals}
        handleRowClick={handleRowClick}
        onAddClick={onAddClick}
      />
    </BaseLayout>
  );
};

export default Terminal;
