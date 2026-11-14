import { useEffect, useState } from "react"

function Card({ title, subtitle, body }) {
    const [bills, setBills] = useState([]);

    useEffect(() => {
        fetchCardBills();
    }, []);

    const fetchCardBills = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/bills/");
            const data = await response.json();
            setBills(data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        // <div id="card-col" className="col-sm-6 text-center">
        // <div id="card-col" className="col-12 col-md-6 text-center">
        <div className="col-12 col-md-6 text-center">
            <div id="card-col">
                <div className="card">
                    <div className="card-body">
                    <h5 className="card-title">************{title}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{subtitle}</h6>
                    <p className="card-text">{body}</p>
                    {/* <a href="#" className="card-link">Card link</a>
                    <a href="#" className="card-link">Another link</a> */}
                    </div>
                </div>

                <ul className="list-group list-group-flush">

                    {[...bills]
                        .sort((a, b) => a.company.localeCompare(b.company))
                        .map((bill) => (
                            <li key={bill.id} className="list-group-item d-flex justify-content-between align-items-center">
                                {bill.company}
                                <div className="d-flex gap-2">
                                    <button className="btn btn-sm btn-outline-primary">
                                        Edit Card
                                    </button>

                                    <button className="btn btn-sm btn-outline-danger">
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Card