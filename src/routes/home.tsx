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
    console.log(blogs);
    return blogs.map((article: any) => {
      return {
        image: article.featured_image,
        title: article.title,
        body: article.summary,
        slug: article.url,
      };
    });
  }

  render() {
    return (
      <div>
        <Header />
        <AboutMe />
        {this.state.projectMangementArticles.length > 0 &&
          <HomeBlog articles={this.state.projectMangementArticles} name={Constants.propertyKey} header={propertyHeader} />
        }
        {this.state.iosArticles.length > 0 &&
          <HomeBlog articles={this.state.projectMangementArticles} name={Constants.softwareKey} header={softwareHeader} flipped={true} blue={true} />
        }
        <Contact />
      </div>
    );
  }
}

const propertyHeader = {
  title: 'Property',
  body: 'I have a project management company that specialises in turning round renovations quickly. This is especially useful when you have tenants wanting to move in quickly, minimising rental loss, or when trading a property (buying to renovate and sell).\n\nGet in touch to get some assistance with your renovation.',
};

const softwareHeader = {
  title: 'iOS Development',
  body: 'In my spare time, I like to write articles that help people with iOS development - whether it’s a new tool, a how to, or an easier way to do something. You can check some of the articles out below or visit my publications on Medium.',
};
