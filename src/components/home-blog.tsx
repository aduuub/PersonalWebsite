import * as React from 'react';
import { Element } from 'react-scroll';

import { IArticleTile } from 'models/article';
import BlogTile from './blog-tile';

interface IProps {
    // Content
    articles: IArticleTile[];
    name: string;
    header: IBlogHeader;

    // Style options
    flipped?: boolean;
    blue?: boolean;
}

export default class HomeBlog extends React.Component<IProps> {

  render() {
    // Feature tile
    const isFlipped = this.props.flipped ?? false;
    const feature = <FeatureBlog isLeft={!isFlipped} article={this.props.articles[0]} />;

    // Standard tiles
    const maxTiles = Math.min(4, this.props.articles.length);
    const remainingTiles = this.props.articles.slice(1, maxTiles);
    const blogs = <BlogList articles={remainingTiles} />;
    
    // Both columns (so we can flip it)
    const columns = [feature, blogs];
    if (this.props.flipped) {
        columns.reverse();
    }

    const homeBlogModifier = this.props.blue ? 'HomeBlog--blue' : '';

    return (
        <Element name={this.props.name}>
        {this.props.blue ? <div className='HomeBlog-slant'></div> : <></> }
          <div className={'HomeBlog ' + homeBlogModifier}>
            <Header {...this.props.header} />
            <div className='HomeBlog-tiles Container'>

                {/* Mobile */}
                <div className='u-md-hidden'>
                    <BlogList articles={this.props.articles} />
                </div>
                
                {/* Tablet */}
                <div className='Grid u-sm-hidden'>
                    <div className='u-md-width1of2'>
                        {columns[0]}
                    </div>
                    <div className='u-md-width1of2'>
                        {columns[1]}
                    </div>
                </div>
            </div>
          </div>
        </Element>
    );
  }
}

// Article list === 

function BlogList(props: {articles: IArticleTile[]}) {
    return (
        <div className='Homeblog-tiles-list'>
            {props.articles.map((article, index) => <BlogTile article={article} key={index} />)}
        </div>
    );
}

// Blog header ===

interface IBlogHeader {
    title: string;
    body: string;
}

function Header(props: IBlogHeader) {
    return (
        <div className='HomeBlog-header'>
            <p className='HomeBlog-header-leading'>My thoughts on</p>
            <h2 className='HomeBlog-header-main'>{props.title}</h2>
            <NewlineText text={props.body} />
        </div>
    );
}

// Feature blog === 

interface IFeatureBlogProps {
    isLeft: boolean;
    article: IArticleTile;
}

function FeatureBlog(props: IFeatureBlogProps) {
    const featureBlogClass = props.isLeft ? 'FeatureBlog--left' : 'FeatureBlog--right';
    return (
        <div className={'FeatureBlog ' + featureBlogClass} >
            <img src={props.article.image} />
            <h4 className='FeatureBlog-title'>{props.article.title}</h4>
            <p>{props.article.body}</p>
        </div>
    );
}

// NewlineText

interface INewlineTextProps {
    text: string;
}

function NewlineText(props: INewlineTextProps) {
    const text = props.text;
    return (
        <>
        {text.split('\n').map((str) => <p>{str}</p>)}
        </>
    );
  }
