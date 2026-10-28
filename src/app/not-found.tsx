import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container not-found">
      <span className="section-label">404 / SAYFA BULUNAMADI</span>
      <h1>Bu sayfa burada değil.</h1>
      <p>Ürün koleksiyonumuzu inceleyerek devam edebilirsiniz.</p>
      <Link className="button button-dark" href="/urunler">
        Ürünlere dön →
      </Link>
    </div>
  );
}
