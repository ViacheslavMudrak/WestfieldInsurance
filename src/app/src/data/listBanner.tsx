import Image from 'next/image';
import { ListBannerProps } from 'src/ui/FeatureBannerList/ListBanner';

export const exampleListBannerProps = (props: ListBannerProps): ListBannerProps => {
  const { title, richText, image, invert } = props;
  return {
    title: title ? title : <div>{'Celebrating Our Centennial'}</div>,
    richText: richText ? (
      richText
    ) : (
      <div>
        {
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        }
      </div>
    ),
    image: image ? (
      image
    ) : (
      <Image
        alt="Alt goes here"
        src="https://picsum.photos/600/400"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
    ),
    invert: invert,
  };
};
