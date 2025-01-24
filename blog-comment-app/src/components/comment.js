import { useState } from 'react'

function Comment(props) {
    
    const [comment, setComment] = useState(props.model);
    const [showEditForm, setShowEditForm] = useState(false);

    function handleText(event) {
        setComment((c) => {
            return {...c, Comment: event.target.value};
        });
    }

    function save (event) {
        event.preventDefault();
        toggleEditForm();
        // Todo: Save the updated comment to backend.
        // Close the edit form.
    }

    function toggleEditForm() {
        setShowEditForm(!showEditForm);
    }

    return (
        <div className='base-element'>
            <p>{comment.Comment}</p>
            <label>By: </label> <label>{comment.Author}</label>
            <button type="button" onClick={toggleEditForm}>Edit</button>

            { showEditForm &&
            <form onSubmit={save}>
                <textarea className='comment-text' onChange={handleText} value={comment.Comment}></textarea>
                <div>
                <button type="submit">Save</button>
                <button type="button" onClick={toggleEditForm}>Cancel</button>
                </div>
            </form>
            }
        </div>
    )
}

export default Comment;