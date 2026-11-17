import { useState } from "react"
import Modal from "./Modal"
import { postJSON } from "./api"

function AddCardModal({ onClose, onCreated }) {
    const [owner, setOwner] = useState("");
    const [lastFour, setLastFour] = useState("");
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            const card = await postJSON("/cards/create/", { owner, last_four: lastFour });
            onCreated(card);
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal title="Add Card" onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <div className="modal-body text-start">
                    {error && <div className="alert alert-danger" style={{ whiteSpace: "pre-line" }}>{error}</div>}

                    <div className="mb-3">
                        <label htmlFor="card-owner" className="form-label">Card holder</label>
                        <input
                            id="card-owner"
                            type="text"
                            className="form-control"
                            maxLength={50}
                            required
                            autoFocus
                            value={owner}
                            onChange={(e) => setOwner(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="card-last-four" className="form-label">Last 4 digits</label>
                        <input
                            id="card-last-four"
                            type="text"
                            inputMode="numeric"
                            className="form-control"
                            pattern="\d{4}"
                            title="Exactly 4 digits"
                            maxLength={4}
                            required
                            value={lastFour}
                            onChange={(e) => setLastFour(e.target.value.replace(/\D/g, ""))}
                        />
                    </div>
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                    <button type="submit" className="btn btn-primary" disabled={submitting}>
                        {submitting ? "Saving..." : "Add Card"}
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default AddCardModal
