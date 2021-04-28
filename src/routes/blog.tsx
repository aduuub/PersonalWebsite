import * as React from 'react';
import Butter from 'models/butter';

interface IProps {
  match: any;
}

interface IState {
  post?: IBlogData;
}

interface IBlogData {
  body: string;
}

export default class BlogRoute extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = { post: undefined };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    const response = await Butter.post.retrieve(id);
    console.log(response);
    this.setState({ post: response.data.data });
  }

  render() {
    const { post } = this.state;
    return (
      <div className='Blog'>
        <div className='Container'>
          {post && 
            <div dangerouslySetInnerHTML={{ __html: post.body }} />
          }
        </div>
      </div>
    );
  }
}
