import { ComponentTheme, SelectInputOption } from 'src/types/generic';
import { AgentSearchProps } from 'src/ui/AgentSearch/AgentSearch';

export const defaultInsuranceOptions: SelectInputOption[] = [
  {
    text: 'Home',
    value: 'home',
  },
  {
    text: 'Business',
    value: 'business',
  },
  {
    text: 'Auto',
    value: 'auto',
  },
];

export const exampleAgentSearchProps = (props: AgentSearchProps): AgentSearchProps => {
  const { title, insuranceOptions, theme, className, onSubmitForm } = props;

  return {
    title: title ? title : <div>Find an Agent</div>,
    insuranceOptions: insuranceOptions ? insuranceOptions : defaultInsuranceOptions,
    theme: theme ? theme : ComponentTheme.Light,
    className: className ? className : undefined,
    onSubmitForm: onSubmitForm,
  };
};
