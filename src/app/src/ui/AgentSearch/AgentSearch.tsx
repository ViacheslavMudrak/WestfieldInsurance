import classNames from 'classnames';
import { useState } from 'react';
import ErrorSVG from 'src/assets/icons/error.svg';
import { ComponentTheme, SelectInputOption } from 'src/types/generic';
import Button from '../Button/Button';
import styles from './agent-search.module.scss';
export interface AgentSearchProps {
  title?: JSX.Element | string;
  insuranceOptions?: SelectInputOption[];
  theme?: ComponentTheme;
  className?: string;
  onSubmitForm: (zipCode, insuranceType) => void;
  zipErrorText?: string;
  agentSearchButtonText?: string;
  missingZipText?: string;
  insuranceTypeLabel?: string;
  zipCodeLabel?: string;
}

export enum InsuranceTypeEnum {
  homeAndAuto = 'IsHomeAndAuto',
  business = 'IsBusiness',
  bond = 'IsBond',
}

export type AgentFormData = {
  insuranceType: InsuranceTypeEnum;
  zipCode: string;
};

export default function AgentSearch({
  title,
  insuranceOptions,
  theme = ComponentTheme.Light,
  className,
  zipErrorText,
  agentSearchButtonText,
  missingZipText,
  insuranceTypeLabel,
  zipCodeLabel,
  onSubmitForm,
}: AgentSearchProps): JSX.Element {
  const [insuranceType, setInsuranceType] = useState('');
  const [zip, setZip] = useState('');

  const [zipCodeReqError, setZipCodeReqError] = useState(false);
  const [zipCodeValError, setZipCodeValError] = useState(false);

  const componentTheme = theme === ComponentTheme.Dark ? styles.dark : styles.light;

  const optionsArray: SelectInputOption[] = insuranceOptions ?? [];

  const selectChange = (str) => {
    setInsuranceType(str);
  };

  const zipChange = (evt) => {
    const zipValue = evt.target.value as string;
    setZipCodeReqError(!zipValue);

    const isValid = /^[0-9]{5}$|^[0-9]{9}$/.test(zipValue);
    setZipCodeValError(!isValid && !!zipValue);

    setZip(zipValue);
  };

  const handleSubmitForm = () => {
    const agentFormData = {
      zipCode: zip,
      insuranceType: insuranceType,
    };

    if (zip && !zipCodeReqError && !zipCodeValError) {
      onSubmitForm(agentFormData.zipCode, agentFormData.insuranceType);
    }
  };

  return (
    <div className={classNames(styles.agentSearch, componentTheme, className)}>
      <div className={classNames(styles.title, 'as-title')}>{title}</div>
      <form
        className={classNames(styles.form, 'as-form')}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label className={classNames(styles.insurance, 'as-insuranceField')}>
          <div className={classNames(styles.label, 'as-insuranceLabel')}>{insuranceTypeLabel}</div>
          <select
            onChange={(e) => selectChange(e.target.value)}
            name="agent_search"
            className={styles.insuranceTypeSelect}
          >
            {optionsArray.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              );
            })}
          </select>
        </label>

        <label
          className={classNames(
            styles.zip,
            zipCodeReqError || zipCodeValError ? styles.hasError : '',
            'as-zipField'
          )}
        >
          <div className={classNames(styles.label, 'as-zipLabel')}>{zipCodeLabel}</div>
          <input
            className={classNames(styles.input, 'as-zipInput')}
            onChange={(evt) => {
              const zValue = evt.target.value as string;
              if (zip || zValue.length > 4) {
                return zipChange(evt);
              }
            }}
            onBlur={(evt) => zipChange(evt)}
          />
          {zipCodeReqError ? (
            <div className={classNames(styles.error, 'error_text')}>
              <ErrorSVG /> {missingZipText}
            </div>
          ) : null}
          {zipCodeValError ? (
            <div className={classNames(styles.error, 'error_text')}>
              <ErrorSVG /> {zipErrorText}
            </div>
          ) : null}
        </label>
        <Button
          className={classNames(styles.submitBtn, styles.agentSearchSubmitBtn, 'as-submitBtn')}
          type="submit"
          aria-label="Submit agent search"
          onClick={handleSubmitForm}
          aria-disabled={!zip || zipCodeReqError || zipCodeValError}
        >
          <span>{agentSearchButtonText}</span>
        </Button>
      </form>
    </div>
  );
}
