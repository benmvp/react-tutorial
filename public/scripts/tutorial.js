class Comment extends React.Component {
    rawMarkdownMarkup() {
        let rawMarkup = marked(this.props.children + '', {sanitize: true});
        return { __html: rawMarkup };
    }
    render() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">{this.props.author}</h2>
                <span dangerouslySetInnerHTML={this.rawMarkdownMarkup()} />
            </div>
        );
    }
}

class CommentList extends React.Component {
    render() {
        let commentNodes = this.props.data.map(comment => {
            return (
                <Comment key={comment.id} author={comment.author}>
                    {comment.message}
                </Comment>
            );
        });

        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
}

class CommentForm extends React.Component {
    render() {
        return (
            <div className="commentForm">
                Hello, world! I am a CommentForm.
            </div>
        );
    }
}

class CommentBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: []};
    }

    loadCommentsFromServer() {
        fetch(this.props.url)
            .then(response => response.json())
            .then(data => this.setState({data}))
            .catch(e => console.error(this.props.url, e));
    }

    componentDidMount() {
        this.loadCommentsFromServer();
        setInterval(
            () => this.loadCommentsFromServer(),
            this.props.pollInterval
        );
    }

    render() {
        return (
            <div className="commentBox">
                <h2>Comments</h2>
                <CommentList data={this.state.data} />
                <CommentForm />
            </div>
        );
    }
}

ReactDOM.render(
    <CommentBox url="/api/comments" pollInterval={2000} />,
    document.getElementById('content')
);
