import { NextPage } from 'next';
import React from 'react';
import { MinimalLayout, DefaultLayout } from 'src/layouts/';

type LayoutType = 'minimal' | 'default';

const WithLayout = (WrappedComponent: NextPage, layout: LayoutType) => {
  return class extends React.Component {
    render() {
      switch (layout) {
        case 'minimal':
          return (
            <MinimalLayout>
              <WrappedComponent {...this.props} />
            </MinimalLayout>
          );
        default:
          return (
            <DefaultLayout>
              <WrappedComponent {...this.props} />
            </DefaultLayout>
          );
      }
    }
  };
};

export default WithLayout;
