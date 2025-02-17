import Image from 'next/image';
import TwitterXIcon from 'src/assets/icons/twitter-x.svg';
import RichTextWrapper, { RichTextStyles } from 'src/ui/RichText/RichTextWrapper';
import { ShareProps } from 'src/ui/Share/Share';
import { VideoProps } from 'src/ui/Video/Video';
import { AuthorBioList } from '../ui/AuthorBio/AuthorBio';
import { ImageComponentProps } from '../ui/ImageComponent/ImageComponent';
import { ResourceDetailProps } from '../ui/ResourceDetail/ResourceDetail';

export const exampleResourceDetailProps = (): ResourceDetailProps => {
  return {
    title: 'Detail lorem ipsum dolore sit amet todos consect',
    publishedDate: '01/01/2023',
    author: ['Westfield Insurance Staff'],
    leadContent: (
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
        tincidunt ut laoreet dolore magna aliquam erat volutpat.
      </p>
    ),
    mainContent: (
      <>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
          tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
          quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
          consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
          consequat, <a href="/">vel illum dolore eu feugiat nulla facilisis .</a>
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
          tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
          quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
          consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
          consequat, vel illum dolore eu feugiat nulla facilisis.
        </p>
        <RichTextWrapper style={RichTextStyles.Block}>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
          tincidunt ut laoreet dolore magna aliquam erat volutpat.
        </RichTextWrapper>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
          tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
          quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
          consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
          consequat, vel illum dolore eu feugiat nulla facilisis.
        </p>
        <RichTextWrapper style={RichTextStyles.Pull}>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
          tincidunt ut laoreet dolore magna aliquam erat volutpat.
        </RichTextWrapper>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
          tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
          quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
          consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
          consequat, vel illum dolore eu feugiat nulla facilisis.
        </p>
      </>
    ),
    // image: (
    //   <Image
    //     alt="Alt goes here"
    //     src="https://picsum.photos/600/400"
    //     layout="responsive"
    //     quality={100}
    //     width={600}
    //     height={400}
    //   />
    // ),
    imageCaption: 'Lorem ipsum dolor sit amet, consectetuer adipiscing.',
    imageRightAligned: true,
  };
};

export const exampleAuthorBioProps = (): AuthorBioList => {
  return {
    authors: [
      {
        label: 'Author',
        bioName: 'Ed Largent',
        image: (
          <Image
            alt="Alt goes here"
            src="https://picsum.photos/id/64/60/60/"
            layout="responsive"
            quality={100}
            width={60}
            height={60}
          />
        ),
        bioText: (
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
            tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
            quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
            consequat.
          </p>
        ),
      },
      {
        label: 'Co-Author',
        bioName: 'Steven King',
        image: (
          <Image
            alt="Alt goes here"
            src="https://picsum.photos/id/65/60/60/"
            layout="responsive"
            quality={100}
            width={60}
            height={60}
          />
        ),
        bioText: (
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
            tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
            quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
            consequat.
          </p>
        ),
      },
    ],
  };
};

export const exampleImageComponentProps = (): ImageComponentProps => {
  return {
    image: (
      <Image
        alt="Alt goes here"
        src="https://picsum.photos/id/64/600/400/"
        layout="responsive"
        width={600}
        height={400}
      />
    ),
    caption: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
  };
};

// Video can be from youtube or from vimeo. Should be wrapped in react fragnent
export const exampleVideoProps = (): VideoProps => {
  return {
    video: (
      <>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/QvPxw4VD_Gw?si=7YveYR27na6Mel3z&amp;controls=0"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </>
    ),
    caption: 'test caption for video',
    transcript: (
      <>
        <h3>Lorem ipsum dolor sit amet</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
          tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
          quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
          consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
          consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto
          odio dignissim carborundum e pluribus unum. Defacto lingo est igpay atinlay. Marquee
          selectus non provisio incongruous feline nolo contendre. Gratuitous octopus niacin, sodium
          glutimate. Quote meon an estimate et non interruptus stadium. Sic tempus fugit esperanto
          qui blandit praesent luptatum zzril delenit augue duis dolore te feugait consectetuer
          adipiscing elit, sed diamnulla facilisi.
        </p>
      </>
    ),
  };
};

export const exampleShareProps = (): ShareProps => {
  return {
    title: 'Share this article',
    url: 'https://www.westfieldinsurance.com/',
    items: [
      {
        icon: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.69641 13.2481C9.62441 13.2481 8.04041 13.2481 7.32041 13.2481C6.93641 13.2481 6.81641 13.1041 6.81641 12.7441C6.81641 11.7841 6.81641 10.8001 6.81641 9.84007C6.81641 9.45607 6.96041 9.33607 7.32041 9.33607H9.69641C9.69641 9.26407 9.69641 7.87207 9.69641 7.22407C9.69641 6.26407 9.86441 5.35207 10.3444 4.51207C10.8484 3.64807 11.5684 3.07207 12.4804 2.73607C13.0804 2.52007 13.6804 2.42407 14.3284 2.42407H16.6804C17.0164 2.42407 17.1604 2.56807 17.1604 2.90407V5.64007C17.1604 5.97607 17.0164 6.12007 16.6804 6.12007C16.0324 6.12007 15.3844 6.12007 14.7364 6.14407C14.0884 6.14407 13.7524 6.45607 13.7524 7.12807C13.7284 7.84807 13.7524 8.54407 13.7524 9.28807H16.5364C16.9204 9.28807 17.0644 9.43207 17.0644 9.81607V12.7201C17.0644 13.1041 16.9444 13.2241 16.5364 13.2241C15.6724 13.2241 13.8244 13.2241 13.7524 13.2241V21.0481C13.7524 21.4561 13.6324 21.6001 13.2004 21.6001C12.1924 21.6001 11.2084 21.6001 10.2004 21.6001C9.84041 21.6001 9.69641 21.4561 9.69641 21.0961C9.69641 18.5761 9.69641 13.3201 9.69641 13.2481Z"
              fill="#4d514d"
            />
          </svg>
        ),
        text: 'Share on Facebook',
        url: 'https://www.facebook.com/sharer.php?u=',
      },
      {
        icon: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.6004 21.5999V14.5679C21.6004 11.1119 20.8564 8.47192 16.8244 8.47192C14.8804 8.47192 13.5844 9.52792 13.0564 10.5359H13.0084V8.78392H9.19238V21.5999H13.1764V15.2399C13.1764 13.5599 13.4884 11.9519 15.5524 11.9519C17.5924 11.9519 17.6164 13.8479 17.6164 15.3359V21.5759H21.6004V21.5999Z"
              fill="#4d514d"
            />
            <path d="M2.71191 8.78394H6.69591V21.5999H2.71191V8.78394Z" fill="#4d514d" />
            <path
              d="M4.70439 2.3999C3.43239 2.3999 2.40039 3.4319 2.40039 4.7039C2.40039 5.9759 3.43239 7.0319 4.70439 7.0319C5.97639 7.0319 7.00839 5.9759 7.00839 4.7039C7.00839 3.4319 5.97639 2.3999 4.70439 2.3999Z"
              fill="#4d514d"
            />
          </svg>
        ),
        text: 'Share on Linkedin',
        url: 'https://www.linkedin.com/sharing/share-offsite/?url=',
      },
      {
        icon: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.576 6.04795C20.856 6.35995 20.112 6.57595 19.32 6.67195C20.136 6.19195 20.76 5.42395 21.048 4.48795C20.28 4.94395 19.44 5.25595 18.552 5.44795C17.832 4.67995 16.8 4.19995 15.672 4.19995C13.488 4.19995 11.736 5.97595 11.736 8.13595C11.736 8.44795 11.76 8.73595 11.832 9.02395C8.56798 8.87995 5.68798 7.29595 3.74398 4.91995C2.35198 7.41595 3.91198 9.47995 4.94398 10.176C4.31998 10.176 3.69598 9.98395 3.16798 9.69595C3.16798 11.64 4.53598 13.248 6.31198 13.608C5.92798 13.728 5.06398 13.8 4.53598 13.68C5.03998 15.24 6.50398 16.392 8.20798 16.416C6.86398 17.472 4.89598 18.3119 2.37598 18.0479C4.12798 19.1759 6.19198 19.8239 8.42398 19.8239C15.672 19.8239 19.608 13.824 19.608 8.63995C19.608 8.47195 19.608 8.30395 19.584 8.13595C20.4 7.53595 21.072 6.83995 21.576 6.04795Z"
              fill="#4d514d"
            />
          </svg>
        ),
        text: 'Share on Twitter',
        url: 'https://twitter.com/intent/tweet?url=',
      },
      {
        icon: <TwitterXIcon aria-label="Twitter X" />,
        text: 'Share on X',
        url: 'https://twitter.com/intent/tweet?url=',
      },
    ],
  };
};
