import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="125" cy="135" r="125" />
    {/* <rect x="-3" y="1" rx="20" ry="20" width="280" height="265" /> */}
    <rect x="-3" y="273" rx="20" ry="20" width="280" height="32" />
    <rect x="5" y="313" rx="20" ry="20" width="265" height="90" />
    <rect x="-1" y="410" rx="20" ry="20" width="280" height="47" />
  </ContentLoader>
);

export default Skeleton;
