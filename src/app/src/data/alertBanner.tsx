import WarningIcon from 'src/assets/icons/warning-red.svg';
import { AlertBannerProps } from 'src/ui/AlertBanner/AlertBanner';
import { v4 } from 'uuid';

export const exampleAlertBannerProps = (): AlertBannerProps => {
  return {
    bgColor: '#F1B828',
    icon: <WarningIcon />,
    content: (
      <p>
        <b>Disaster Relief </b>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
    ),
    link: {
      id: v4(),
      field: {
        value: {
          href: 'https://google.com',
          text: 'More about Disaster Relief',
        },
      },
    },
  };
};
