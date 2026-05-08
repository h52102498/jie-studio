const FAQ_ITEMS = [
  {
    id: "one",
    q: "美甲服務安全嗎？",
    a: "絕對安全。我們嚴格遵循衛生標準，使用一次性工具和高品質產品，確保每位客人都享受到安全的美甲體驗。所有工具都會在每次使用後進行消毒或更換。",
  },
  {
    id: "two",
    q: "如何保持指甲健康？",
    a: "我們建議定期護理指甲，避免使用劇烈的化學品，保持指甲乾淨並定期修剪。此外，使用指甲護理產品和滋潤劑可以幫助保持指甲和周圍皮膚的健康。",
  },
  {
    id: "three",
    q: "我可以自帶設計圖案嗎？",
    a: "當然可以！我們歡迎您自帶設計圖案或者和我們的美甲師討論您的理念，我們會根據您的要求為您打造獨特的美甲設計。",
  },
  {
    id: "four",
    q: "美甲後需要注意什麼？",
    a: "美甲後建議在 24 小時內避免接觸水分，並避免用指甲開罐或做粗重工作。建議使用護甲油保護美甲效果，延長持久度。如有任何不適請立即聯繫我們。",
  },
  {
    id: "five",
    q: "凝膠美甲和一般美甲有什麼差異？",
    a: "凝膠美甲使用 UV 燈固化，持久度可長達 2–3 週，光澤度高且不易剝落。一般美甲則更為輕薄自然，但持久度較短約 1 週。我們可以根據您的需求和生活型態推薦適合的選擇。",
  },
  {
    id: "six",
    q: "如何預約服務？",
    a: "您可以透過 Line ID：Jiestudio 傳訊息給我們，或撥打電話 02-1234-5678 進行預約。建議提前 3–7 天預約，以確保您能取得想要的時段。",
  },
];

function Faq() {
  return (
    <>
      {/* Sub Banner */}
      <div className="sub-banner mt-7">
        <div className="container text-center">
          <h2 className="text-white mb-0">常見問題</h2>
          <div className="sub-banner-underline" />
        </div>
      </div>

      <div className="container my-7">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <p className="text-center text-muted mb-5">
              有任何問題歡迎直接聯繫我們，以下是顧客最常詢問的問題。
            </p>
            <div className="accordion" id="faqAccordion">
              {FAQ_ITEMS.map((item, index) => (
                <div className="accordion-item border-0 mb-3 shadow-sm rounded-2 overflow-hidden" key={item.id}>
                  <h2 className="accordion-header" id={`heading-${item.id}`}>
                    <button
                      className={`accordion-button fw-bold ${index !== 0 ? "collapsed" : ""}`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse-${item.id}`}
                      aria-expanded={index === 0 ? "true" : "false"}
                      aria-controls={`collapse-${item.id}`}
                    >
                      <span
                        className="me-3 fw-bold"
                        style={{ color: "var(--jie-rose)", minWidth: "1.5rem" }}
                      >
                        Q
                      </span>
                      {item.q}
                    </button>
                  </h2>
                  <div
                    id={`collapse-${item.id}`}
                    className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                    aria-labelledby={`heading-${item.id}`}
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body ps-5 text-muted" style={{ lineHeight: 1.8 }}>
                      {item.a}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact CTA */}
            <div
              className="text-center mt-6 p-5 rounded-3"
              style={{ background: "var(--jie-blush)" }}
            >
              <h5 className="fw-bold mb-2">還有其他問題？</h5>
              <p className="text-muted mb-3">隨時透過 Line 或電話聯繫我們，我們很樂意為您解答。</p>
              <a
                href="https://line.me"
                target="_blank"
                rel="noreferrer"
                className="btn btn-dark px-5 py-2 fw-semibold"
              >
                <i className="bi bi-chat-dots me-2" />
                聯繫我們
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Faq;
