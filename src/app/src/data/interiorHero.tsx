import { RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'next/image';
import { ComponentTheme } from 'src/types/generic';
import Button from 'src/ui/Button/Button';
import { InteriorHeroBannerPropsUi } from 'src/ui/InteriorHeroBanner/InteriorHeroBanner';

export const darkOverlayImage = (
  <Image
    width="953"
    height="550"
    alt="Alt goes here"
    src="/herobanner-example-alt.png"
    quality={100}
  />
);

export const exampleInteriorHeroBannerProps = (
  props: InteriorHeroBannerPropsUi
): InteriorHeroBannerPropsUi => {
  const {
    title,
    image,
    richTextCopy,
    link,
    theme,
    agentSearch,
    agentSearchTheme,
    agentSearchProps,
    overflowTheme,
    imageBottom,
  } = props;
  let buttonVariant: 'outlineWhite' | 'primary';

  switch (theme) {
    case ComponentTheme.Light:
      buttonVariant = 'primary';
      break;
    case ComponentTheme.Dark:
      buttonVariant = 'outlineWhite';
      break;
    default:
      buttonVariant = 'primary';
      break;
  }

  return {
    title: title ? title : <div>{'Celebrating Our Centennial'}</div>,
    image: image ? image : undefined,
    richTextCopy: richTextCopy ? (
      richTextCopy
    ) : (
      <RichText
        field={{
          value:
            'Lorem ipsum dolor sit amet, consectetur adip iscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        }}
      />
    ),
    link: link ? (
      link
    ) : (
      <Button variant={buttonVariant} href="https://www.google.com" target="_blank">
        More about Centennial
      </Button>
    ),
    theme: theme ? theme : ComponentTheme.Light,
    agentSearch: agentSearch,
    agentSearchProps: agentSearchProps,
    agentSearchTheme: agentSearchTheme,
    overflowTheme: overflowTheme,
    imageBottom: imageBottom,
  };
};
