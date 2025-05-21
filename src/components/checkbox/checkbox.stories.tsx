import { Checkbox } from './checkbox';

export default {
  title: 'Checkbox',
  component: Checkbox,
};

export const Default = () => <Checkbox checked={false} onCheckedChange={() => {}} />;
