export default function Home() {
  return(
    <main className="page">
      <div className="container">
        <h1>Website đang được phát triển</h1>
        <p>Trang web hiện chưa hoàn thành.<br />Vui lòng quay lại sau nhé!</p>
        <div className="loading">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p className="copyright">© 2026 My Website</p>
      </div>
    </main>
  )
}