import React, { useState } from 'react';

function Home() {
    let [data, setdata] = useState("");
    const [comments, setComments] = useState([]);
    const [cout, setcout] = useState(0)

    const handleClick = () => {
        if (data.length === 0) return;
        setComments([...comments, { text: data, replies: [] }]);
        setdata("");
    };

    const handleReply = (path, replyText) => {
        const updatedComments = [...comments];
        let currentLevel = updatedComments;

        // Traverse the path to the target comment
        for (let i = 0; i < path.length; i++) {
            if (!currentLevel[path[i]].replies) {
                currentLevel[path[i]].replies = [];
            }
            currentLevel = currentLevel[path[i]].replies;
        }

        // Add the new reply
        currentLevel.push({ text: replyText, replies: [] });

        setComments(updatedComments);
        console.log(comments);
    };

    const renderReplies = (replies, path) => (
        replies.map((reply, index) => (
            <div key={index} style={{ marginLeft: '20px' }}>
                <p style={{ color: "#34495e", backgroundColor: "#bdc3c7", padding: "5px" }}>{reply.text}</p>
                {reply.replies && renderReplies(reply.replies, [...path, index])}
                <button
                    onClick={() => {
                        const replyText = prompt('Enter your reply:');
                        if (replyText) {
                            handleReply([...path, index], replyText);
                        }
                    }}
                    className='btn-reply'
                    style={{ marginLeft: "20px" }}
                >
                    Reply
                </button>
            </div>
        ))
    );

    return (
        <>
            {/* comment text area section */}
            <div className='container box'>
                <h1 style={{ textAlign: "center" }}>Welcome to Comment Section</h1>
                <div className="textarea">
                    <textarea
                        name=""
                        id=""
                        cols="30"
                        rows="6"
                        placeholder='Enter your comment here'
                        value={data}
                        onChange={(e) => setdata(e.target.value)}
                    ></textarea>
                </div>
                <button className='btn' onClick={handleClick}>
                    Submit
                </button>

                {/* comment section start */}
                <div className="comment-section mt-3">
                    <h1>Comment Section</h1>
                    <div className="comment-area">
                        {comments && comments.map((comment, parentIndex) => (
                            <div key={parentIndex}>
                                <br />
                                <span style={{ backgroundColor: "#95a5a6", display: "block", width: "100%", padding: "10px" }}>
                                    <span style={{ fontWeight: "bold" }}>{parentIndex + 1} comment :</span> {comment.text}
                                </span>
                                <br />
                                {comment.replies && renderReplies(comment.replies, [parentIndex])}
                                <button
                                    onClick={() => {
                                        const replyText = prompt('Enter your reply:');
                                        if (replyText) {
                                            handleReply([parentIndex], replyText);
                                        }
                                    }}
                                    className='btn-reply'
                                >
                                    Reply
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
