
import { useSelector } from "react-redux";

function Message() {


    const messages = useSelector((state)=>state.message);

    return (
        <>
        {messages?.map((msg)=>{
          return(
            <div
            key={msg.id}
        className="toast-container position-fixed"
        style={{ top: "64px", right: "15px" }}
      >
            <div
            
          className="toast show"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          data-delay="3000"
        >
          <div className={`toast-header text-dark bg-${msg.type}`}>
            <strong className="me-auto">{msg.title}</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            />
          </div>
          <div className="toast-body">{msg.text}</div>
        </div>
        </div>
          )
        })}
        
      </>
    );
  }
  
  export default Message;