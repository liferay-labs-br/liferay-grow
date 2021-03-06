import React from 'react';

const WelcomeHeader: React.FC<React.HTMLAttributes<HTMLElement>> = () => {
  return (
    <div className="welcome__header">
      <h1>Grow Together</h1>
      <p>
        When you have a very busy day and are committed to activities and
        deadlines, it can be hard to find the time to give back to others.
        However, what you may not know is that taking the time to teach people
        with less experience on a subject that you are an expert benefits you
        too.
      </p>
      <p>
        Here’s a look at some benefits to give back to others: it can improve
        self esteem, allows you to build a connection with others, helps to
        improve the career and life of someone else, and be recognized by the
        company and colleagues.
      </p>
    </div>
  );
};

export default WelcomeHeader;
