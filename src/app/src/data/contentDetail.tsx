import Image from 'next/image';
import { v4 } from 'uuid';
import { ContentDetailProps } from '../ui/ContentDetail/ContentDetail';

export const DUMMY_NAV = {
  navTitle: 'Title Lorem Ipsum',
  navLinks: [
    {
      field: {
        value: {
          href: '#test',
          text: 'Navigation One',
        },
      },
      id: v4(),
    },
    {
      field: {
        value: {
          href: '#test2',
          text: 'Navigation Two',
        },
      },
      id: v4(),
    },
    {
      field: {
        value: {
          href: '#test3',
          text: 'Navigation Three',
        },
      },
      id: v4(),
    },
    {
      field: {
        value: {
          href: '#test4',
          text: 'Navigation Four',
        },
      },
      id: v4(),
    },
    {
      field: {
        value: {
          href: '#test5',
          text: 'Navigation Five',
        },
      },
      id: v4(),
    },
  ],
};

export const exampleContentDetailProps = (): ContentDetailProps => {
  return {
    label: 'Label lorem ipsum',
    title: 'Content Full Width',
    subtitle:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. ',
    mainContent: (
      <>
        <h2 id="test">Large Header Lorem</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
          tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
          quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
          consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
          consequat, vel illum dolore eu feugiat nulla facilisis .
        </p>
        <h3>Medium Header Lorem</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
          tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
          quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
          consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
          consequat, vel illum dolore eu feugiat nulla facilisis.
        </p>
        <h4>Small Header Lorem</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
          tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
          quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
          consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
          consequat, vel illum dolore eu feugiat nulla facilisis.
        </p>
        <ul id="test2">
          <li>Lorem ipsum dolor sit amet</li>
          <li>Lorem ipsum dolor sit amet</li>
          <li>Lorem ipsum dolor sit amet</li>
        </ul>
        <ol>
          <li>Lorem ipsum dolor sit amet</li>
          <li>Lorem ipsum dolor sit amet</li>
          <li>Lorem ipsum dolor sit amet</li>
        </ol>
        <h6>XSmall Header Lorem</h6>
        <small>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
          tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
          quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
          consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
          consequat, vel illum dolore eu feugiat nulla facilisis.
        </small>
        <div className="rich-text">
          <h1>Header 1</h1>
          <h2>Header 2</h2>
          <h3>Header 3</h3>
          <h4>Header 4</h4>
          <h5 id="test3">Header 5</h5>
          <h6>Header 6</h6>
          <p>Normal text that should match the rest of the site.</p>
          <p>
            <em>Italicized text</em>
          </p>
          <p>
            <u>Underlined text</u>
          </p>
          <ul id="test4">
            <li>Bulleted List Item 1</li>
            <li>Bulleted List item 2</li>
            <li>bulleted list item 3</li>
          </ul>
          <ol>
            <li>numbered list item 1</li>
            <li>numbered list item 2</li>
            <li>numbered list item 3</li>
          </ol>
          <p>
            Test of a{' '}
            <a href="/" rel="noopener noreferrer">
              Link{' '}
            </a>
            being <strong>inserted</strong>
          </p>
          <p id="test5">Test of an Image below</p>
          <p>
            <img
              src="https://xmc-ohiofarmers0dc2-westfieldin1e63-qa.sitecorecloud.io/-/media/Project/WestfieldInsurance/WestfieldInsurance/Test-Images/feature-banner-working-at-westfield.png"
              alt="feature-banner-working-at-westfield"
              height="512"
              width="690"
            />
          </p>
        </div>
      </>
    ),
    image: (
      <Image
        alt="Alt goes here"
        src="https://picsum.photos/800/300"
        layout="responsive"
        quality={100}
        width={800}
        height={300}
      />
    ),
    imageCaption: 'Lorem ipsum dolor sit amet, consectetuer adipiscing.',
    hasNavigation: true,
    navigation: DUMMY_NAV,
  };
};
