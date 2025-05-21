import { Multiselect } from './multiselect';

export default {
  title: 'Multiselect',
  component: Multiselect,
};

export const Default = () => (
  <Multiselect
    options={[
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
    ]}
  />
);
