import butter from 'models/butter';
import * as React from 'react';

import { IArticleTile } from 'models/article';

import AboutMe from 'components/about-me';
import Contact from 'components/home-contact';
import Header from 'components/header';
import HomeBlog from 'components/home-blog';
import Constants from 'models/constants';

interface IProps { 

}

interface IState {
  projectMangementArticles: IArticleTile[];
  iosArticles: IArticleTile[];
}

export default class HomeRoute extends React.Component<IProps, IState> {

  constructor(props: IProps, context: any) {
    super(props, context);
    this.state = {
      projectMangementArticles: [],
      iosArticles: [],
    };
  }

  async componentDidMount() {
    const key = 'project-management';
    
    this.setState({
      projectMangementArticles: await this.articles(key),
      iosArticles: await this.articles(key),
    });
  }

  async articles(key: string): Promise<IArticleTile[]> {
    const category = await butter.category.retrieve(key, {
      include: 'recent_posts',
    });

    const blogs = category.data.data.recent_posts;
    return blogs.map((article: any) => {
      return {
        image: article.featured_image,
        title: article.title,
        body: article.summary,
      };
    });
  }

  render() {
    return (
      <div>
        <Header />
        <AboutMe />
        {this.state.projectMangementArticles.length > 0 &&
          <HomeBlog articles={this.state.projectMangementArticles} name={Constants.propertyKey} />
        }
        {this.state.iosArticles.length > 0 &&
          <HomeBlog articles={this.state.projectMangementArticles} name={Constants.softwareKey} flipped={true} blue={true} />
        }
        <Contact />
      </div>
    );
  }
}
