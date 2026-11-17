import { useEffect } from "react"

// A Bootstrap-styled modal controlled by React state (render it to open it,
// stop rendering it to close it). Closes on Escape or a click outside the dialog.
function Modal({ title, onClose, children }) {
    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [onClose]);

    return (
        <>
            <div className="modal d-block" tabIndex="-1" role="dialog" aria-modal="true" onClick={onClose}>
                <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />
                        </div>
                        {children}
                    </div>
                </div>
            </div>
            <div className="modal-backdrop show" />
        </>
    )
}

export default Modal
