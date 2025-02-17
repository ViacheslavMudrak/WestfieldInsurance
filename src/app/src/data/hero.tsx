import { RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'next/image';
import { ComponentTheme } from 'src/types/generic';
import Button from 'src/ui/Button/Button';
import { HeroBannerPropsUi } from 'src/ui/HeroBanner/HeroBanner';

export const darkOverlayImage = (
  <Image
    width="953"
    height="550"
    alt="Alt goes here"
    src="/herobanner-example-alt.png"
    quality={100}
  />
);

export const exampleHeroBannerProps = (props: HeroBannerPropsUi): HeroBannerPropsUi => {
  const { title, image, richTextCopy, link, theme, overlay, agentSearch, agentSearchProps } = props;
  let buttonVariant: 'outlineWhite' | 'outline';

  switch (theme) {
    case ComponentTheme.Light:
      buttonVariant = 'outline';
      break;
    case ComponentTheme.Dark:
      buttonVariant = 'outlineWhite';
      break;
    default:
      buttonVariant = 'outline';
      break;
  }

  return {
    title: title ? title : <div>{'Celebrating Our Centennial'}</div>,
    image: image ? (
      image
    ) : (
      <Image
        width="590"
        height="470"
        alt="Alt goes here"
        src="/herobanner-example.png"
        quality={100}
      />
    ),
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
    overlay: overlay,
    agentSearch: agentSearch,
    agentSearchProps: agentSearchProps,
  };
};
