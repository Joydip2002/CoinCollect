import { useState } from "react";
import { ImCross } from "react-icons/im";

const Settings = () => {
  const [editmode, isOpenEditMode] = useState<boolean>(true);

  const toggleEditMode = () => {
    isOpenEditMode(!editmode);
  }
  return (
    <>
      {/* modal */}
      {
        editmode?
        <div className="chekpasswordModal">
          <div className="checkPasswordForm">
            <div style={{display:'flex',justifyContent:'end', marginBottom:"10px",cursor:"pointer"}}>
              <ImCross color="white" onClick={()=>isOpenEditMode(false)}/>
            </div>
            <form action="">
              <input type="password" placeholder="Enter password" />
              <button>Verify</button>
            </form>
          </div>
        </div>
        :''
      }
      {/* modal */}
      <div className="setting-container">
        <h3 style={{ paddingBottom: "10px" }}>Settings</h3>
        <div className="edit-mode" style={{ float: "right" }}>
          <button onClick={toggleEditMode}>Edit mode</button>
        </div>
        <div className="profile-card">
          {/* <img src="" alt="" />
          <input type="text" />
          <input type="text" /> */}
        </div>
      </div>
    </>
  )
}

export default Settings;
