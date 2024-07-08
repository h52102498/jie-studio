function Faq(){
    return(<>
        <div className="mt-7">
        <div className="banner bg-dark py-4 position-relative">
            <div className="banner-content text-white text-center">
                <h2>常見問題</h2>
            </div>
        </div>
        <div className="container my-5">
            <div className="accordion mt-5" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        美甲服務安全嗎？
                    </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <p>絕對安全。我們嚴格遵循衛生標準，使用一次性工具和高品質產品，確保每位客人都享受到安全的美甲體驗。
                        </p> 
                    </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                    <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        如何保持指甲健康？
                    </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <p>我們建議定期護理指甲，避免使用劇烈的化學品，保持指甲乾淨並定期修剪。此外，使用指甲護理產品和滋潤劑可以幫助保持指甲和周圍皮膚的健康。</p>
                    </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                    <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        我可以自帶設計圖案嗎？
                    </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <p>當然可以！我們歡迎您自帶設計圖案或者和我們的美甲師討論您的理念，我們會根據您的要求為您打造獨特的美甲設計。</p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </>
    )
}


export default Faq;
