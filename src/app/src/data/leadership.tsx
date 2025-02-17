import { LeadershipBioProps, LeadershipListingProps } from 'src/ui/Leadership/LeadershipBio';
import Image from 'next/image';
import Button from 'src/ui/Button/Button';

export const exampleLeadershipBioProps = (): LeadershipBioProps => {
  return {
    personName: 'John Doe',
    title: 'Chief Legal Officer and Secretary',
    biography: (
      <>
        <div>
          John Doe assumed the role of Chief Legal Officer and Secretary in 2003. He is responsible
          for leading Westfield’s legal affairs and has oversight of corporate compliance, internal
          audit, government relations and community investment. Before joining Westfield, John Doe
          served in various leadership positions with Price Waterhouse Coopers and Ernst &amp;
          Young.{' '}
        </div>
        <div>&nbsp;</div>
        <div>
          He received a Bachelor of Arts from the University of Akron, Juris Doctor from the
          University of Akron Law School and Master of Laws from Capital University Law School. He
          was admitted to the Ohio Bar in 1987 and is a CPA (inactive). Carrino also served as an
          adjunct professor of law at Capital University Law School.{' '}
        </div>
        <div>&nbsp;</div>
        <div>
          John Doe is Secretary of the Ohio Farmers Insurance Company Board of Directors and also
          serves on the boards of the Ohio Chamber of Commerce and Medina Hospital Foundation.
        </div>
      </>
    ),
    image: (
      <Image
        alt="Alt goes here"
        src="https://picsum.photos/id/64/200/200/"
        layout="responsive"
        quality={100}
        width={200}
        height={200}
      />
    ),
    nextLink: (
      <Button variant="outline" href="https://www.google.com" target="_blank">
        Read next bio
      </Button>
    ),
  };
};

export const exampleLeadershipListingProps = (): LeadershipListingProps => {
  return {
    persons: [
      {
        personName: 'John Doe',
        title: 'President, CEO and Board Chair',
        image: (
          <Image
            alt="Alt goes here"
            src="https://picsum.photos/id/64/200/200/"
            layout="responsive"
            quality={100}
            width={200}
            height={200}
          />
        ),
        bioLink: (
          <Button variant="outline" href="https://www.google.com" target="_blank">
            View bio
          </Button>
        ),
      },
      {
        personName: 'Jim Doe',
        title: 'Chief Legal Officer and Secretary',
        image: (
          <Image
            alt="Alt goes here"
            src="https://picsum.photos/id/65/300/400/"
            layout="responsive"
            quality={100}
            width={300}
            height={400}
          />
        ),
        bioLink: (
          <Button variant="outline" href="https://www.google.com" target="_blank">
            View bio
          </Button>
        ),
      },
      {
        personName: 'Jack Doe',
        title: 'Chief Operations Officer',
        image: (
          <Image
            alt="Alt goes here"
            src="https://picsum.photos/id/64/200/200/"
            layout="responsive"
            quality={100}
            width={200}
            height={200}
          />
        ),
        bioLink: (
          <Button variant="outline" href="https://www.google.com" target="_blank">
            View bio
          </Button>
        ),
      },
      {
        personName: 'Joseph Doe',
        title: 'Chief of Staff',
        image: (
          <Image
            alt="Alt goes here"
            src="https://picsum.photos/id/64/200/200/"
            layout="responsive"
            quality={100}
            width={200}
            height={200}
          />
        ),
        bioLink: (
          <Button variant="outline" href="https://www.google.com" target="_blank">
            View bio
          </Button>
        ),
      },
      {
        personName: 'Michael Doe',
        title: 'Chief Financial Officer and Treasurer',
        image: (
          <Image
            alt="Alt goes here"
            src="https://picsum.photos/id/65/200/200/"
            layout="responsive"
            quality={100}
            width={200}
            height={200}
          />
        ),
        bioLink: (
          <Button variant="outline" href="https://www.google.com" target="_blank">
            View bio
          </Button>
        ),
      },
    ],
  };
};
