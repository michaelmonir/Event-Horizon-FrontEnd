import React,{useEffect} from 'react';
import validationPage from './validationPage.css';
function ValidationPage(props) {
        useEffect(() => {
            const codes = document.querySelectorAll(".codeInput");
            codes[0].focus();
            codes.forEach((code, index) => {
                code.addEventListener("keydown", (e) => {
                    if (e.key >= 0 && e.key <= 9) {
                        codes[index].value = "";
                        if (codes[index + 1]) {
                            setTimeout(() => codes[index + 1].focus(), 10);
                        }
                    } else if (e.key === "Backspace") {
                        if (codes[index - 1]) {
                            setTimeout(() => codes[index - 1].focus(), 10);
                        }
                    }
                });
            });
        }, []);

    return (
        <div className="container">
            <h2>Verify Account</h2>
            <div className="code">
                <input type="number" className="codeInput" placeholder="0" min="0" max="9" required/>
                <input type="number" className="codeInput" placeholder="0" min="0" max="9" required/>
                <input type="number" className="codeInput" placeholder="0" min="0" max="9" required/>
                <h2>-</h2>
                <input type="number" className="codeInput" placeholder="0" min="0" max="9" required/>
                <input type="number" className="codeInput" placeholder="0" min="0" max="9" required/>
                <input type="number" className="codeInput" placeholder="0" min="0" max="9" required/>
            </div>
            <div>
                <button type="button" className="btn btn-primary">
                    Verify
                </button>
            </div>
        </div>
    );
}

export default ValidationPage;