import { Selection } from '../components/selection';
import { Events } from '../types';
import './landing.css';

interface LandingProps {
  topic: string;
  sock: (type: Events, data: {}) => void;
}

export const Landing = ({ topic, sock }: LandingProps) => {
  return (
    <>
      <h2>{topic}</h2>
      <p className='description'>
        For these courses, you will use your local development environment to
        complete interactive tutorials and build projects.
      </p>
      <a className='faq' href='#'>
        Link to FAQ related to course
      </a>
      <Selection {...{ topic, sock }} />
    </>
  );
};
