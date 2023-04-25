import React, { useState } from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle";
import './style.css'
import { trackPromise } from 'react-promise-tracker';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

const TextSummariser = () => {

    const [state, setState] = useState({ inputTextarea: '', outputTextarea: '', modelOption: 'model1' })

    const textareaHandler = (e) => {
        console.log(e.target.value);
        setState({ ...state, [e.target.name]: e.target.value });
    }
    const rangeHandler = (e) => {
        console.log(e.target.value);
        setState({ ...state, rangeValue: e.target.value });
    }

    const submitHandler = (e) => {
        const model1API = 'http://localhost:8000/api/nltkSummarizer';
        const model2API = 'http://localhost:8000/api/bartSummarizer';
        let APIURL;
        let summary_length;
        if (state.modelOption === 'model1')
            APIURL = model1API;
        else if (state.modelOption === 'model2') {
            APIURL = model2API;
            summary_length = state.rangeValue
        }
        let token = localStorage.getItem('token');
        if (token) {
            trackPromise(
                fetch(APIURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': "application/json",
                        Authorization: `JWT ${token}`
                    },
                    body: JSON.stringify({
                        input_text: state.inputTextarea,
                        ...(summary_length && { summary_length })
                    })
                })
                    .then(res => res.json())
                    .then(req2 => {
                        //console.log("translateText response ", req2);
                        setState({ ...state, outputTextarea: req2.op_text });
                    })
            );
        }
    }
    const saveFileHandler = (e) => {
        const text = document.querySelector(".outputtext");
        let a = window.open('', '', 'height=600, width=800');
        a.document.write('<html>');
        a.document.write('<head><style>body{font-size: 14px; justify-content:center;}</style></head>');
        a.document.write('<body><h1 style="text-align: center;">Text Summary</h1>');
        a.document.write(text.value);
        a.document.write('</body></html>');
        a.document.close();
        a.print();
    }      
    const copyToClipboardHandler = (e) => {
        const textarea = document.querySelector(".outputtext");
        textarea.select();

        navigator.clipboard.writeText(textarea.value).then(() => {
            console.log("Copied Text");
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    }

    return (
        <div className="mt-5">
            <section className="">
                <div className="container">
                    <div className="row textsummariser">
                        <div className="col-12">
                            <h1 className="tsHead">Text Summarizer</h1>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-12 col-sm-6 textArea">
                            <div class="md-form">
                                <textarea id="form10" className="md-textarea inputtext form-control" onChange={textareaHandler} value={state.inputTextarea} name="inputTextarea" rows="10" placeholder="Paste your Transcript here..."></textarea>
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-check my-3">
                                            <input class="form-check-input" type="radio" value="model1" checked={state.modelOption === "model1"} onChange={textareaHandler} name="modelOption" id="model1Option" />
                                            <label class="form-check-label" for="model1Option">
                                                Extractive Summarization
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-check my-3">
                                            <input class="form-check-input" type="radio" value="model2" checked={state.modelOption === "model2"} onChange={textareaHandler} name="modelOption" id="model2Option" />
                                            <label class="form-check-label" for="model2Option">
                                                Abstractive Summarization
                                            </label>
                                            {state.modelOption === "model2" && (
                                                <div>
                                                    <span><strong>Summary Length:</strong></span>
                                                    <input type="range" min="0" max="300" value={state.rangeValue} onChange={rangeHandler} name="rangeOption" id="rangeOption" />
                                                    <label>{state.rangeValue}</label>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 textArea">
                            <div class="md-form">
                                <textarea id="form10" className="md-textarea outputtext form-control" onChange={textareaHandler} name="outputTextarea" value={state.outputTextarea} rows="10"></textarea>
                            </div>

                            <button className="extraBtn" onClick={copyToClipboardHandler}>
                                <span title="Copy to Clipboard">
                                    <i class="fa fa-clipboard"></i>
                                </span>
                            </button>
                            <button className="extraBtn" onClick={saveFileHandler}>
                                <span title="Download File as a text">
                                    <i class="fa fa-download"></i>
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="row mt-3 my-3">
                        <div className="col-12">
                            <center><LoadingIndicator color="#000000" infoText="Generating Summary" /></center>
                            <center><button className="btn btn-success mt-3" onClick={submitHandler} style={{ fontSize: '20px', padding: '10px', fontWeight: 'bold' }}>Generate Summary</button></center>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default TextSummariser
