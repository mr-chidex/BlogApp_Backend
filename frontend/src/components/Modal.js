import React from "react";

const Modal = ({ addnewPostHandler }) => {
  return (
    <div className="modal" id="myModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Add New post</h4>
            <button type="button" className="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <div className="modal-body">
            <form action="/action_page.php">
              <div class="form-group">
                <label for="title">Title:</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter title"
                  id="title"
                  name="title"
                />
              </div>
              <div class="form-group">
                <label for="pwd">Image:</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Image"
                  id="image"
                  name="image"
                />
              </div>
              <div class="form-group">
                <label for="pwd">Content:</label>
                <textarea
                  rows="5"
                  cols="10"
                  type="text"
                  class="form-control"
                  placeholder="Enter Content"
                  id="content"
                  name="content"
                />
              </div>
              <button
                type="submit"
                onClick={addnewPostHandler}
                class="btn btn-primary"
              >
                Submit
              </button>
            </form>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
