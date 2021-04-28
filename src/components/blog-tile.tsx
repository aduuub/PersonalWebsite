import * as React from 'react';
import { Link } from 'react-router-dom';

import { IArticleTile } from 'models/article';

interface IProps {
    article: IArticleTile;
}

export default class BlogTile extends React.Component<IProps> {

  render() {
    const { article } = this.props;

    return (
      <Link className='BlogTile' to={`/blog/${article.slug}`} >
          <div className='BlogTile-container'>
              <div className='BlogTile-left'>
                  <img className='BlogTile-left-img' src={article.image} />
              </div>
              <div className='BlogTile-right'>
                  <h4 className='BlogTile-title'>{article.title}</h4>
                  <p className='BlogTile-body'>{article.body}</p>
              </div>
          </div>
      </Link>
      );
  }
}
