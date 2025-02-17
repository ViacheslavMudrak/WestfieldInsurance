import NextImageExtended from 'components/Helpers/NextImageExtended';
import { ShareIconBed } from './types';
import { ShareItem } from 'src/ui/Share/Share';

export function MapShareIcons(data: ShareIconBed[] | undefined): ShareItem[] {
  const icons: ShareItem[] = [];

  if (data) {
    data.forEach((icon) => {
      icons.push({
        icon: <NextImageExtended field={icon.image.jsonValue} />,
        text: icon.helperText.jsonValue.value,
        url: icon.link.jsonValue.value.href,
      });
    });
  }
  return icons;
}
