import { useState } from "react"
import Modal from "./Modal"
import { postJSON } from "./api"

function AddBillModal({ cards, onClose, onCreated }) {
    const [company, setCompany] = useState("");
    const [cardId, setCardId] = useState("");
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const hasCards = cards.length > 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            const bill = await postJSON("/bills/create/", {
                company,
                card: cardId ? Number(cardId) : null,
            });
            onCreated(bill);
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal title="Add Bill" onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <div className="modal-body text-start">
                    {error && <div className="alert alert-danger" style={{ whiteSpace: "pre-line" }}>{error}</div>}

                    <div className="mb-3">
                        <label htmlFor="bill-company" className="form-label">Company</label>
                        <input
                            id="bill-company"
                            type="text"
                            className="form-control"
                            maxLength={50}
                            required
                            autoFocus
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="bill-card" className="form-label">Card</label>
                        <select
                            id="bill-card"
                            className="form-select"
                            disabled={!hasCards}
                            value={cardId}
                            onChange={(e) => setCardId(e.target.value)}
                        >
                            {hasCards ? (
                                <>
                                    <option value="">Unassigned</option>
                                    {cards.map((card) => (
                                        <option key={card.id} value={card.id}>
                                            {card.owner} (*{card.last_four})
                                        </option>
                                    ))}
                                </>
                            ) : (
                                <option value="">No cards on file</option>
                            )}
                        </select>
                        {!hasCards && (
                            <div className="form-text">Add a card first to assign this bill to it.</div>
                        )}
                    </div>
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                    <button type="submit" className="btn btn-primary" disabled={submitting}>
                        {submitting ? "Saving..." : "Add Bill"}
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default AddBillModal
