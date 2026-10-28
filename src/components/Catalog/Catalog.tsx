"use client";
import { useEffect, useRef, useState } from "react";
import { MagnifyingGlass, X, ArrowRight } from "@phosphor-icons/react";
import { categories, products, normalizeSearch } from "@/lib/catalog";
import ProductCard from "@/components/ProductCard/ProductCard";
import type { CatalogProps } from "@/lib/types";
export default function Catalog({
  initialCategory = "",
  compact = false,
}: CatalogProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const input = useRef<HTMLInputElement>(null);
  // Read browser-only filter state after hydration; the static HTML still contains the catalog.
  useEffect(() => {
    function restore() {
      const params = new URLSearchParams(window.location.search);
      setQuery(params.get("q") || "");
      setCategory(initialCategory || params.get("kategori") || "");
    }
    restore();
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, [initialCategory]);
  function update(nextQuery: string, nextCategory: string) {
    setQuery(nextQuery);
    setCategory(nextCategory);
    const url = new URL(window.location.href);
    if (nextQuery) url.searchParams.set("q", nextQuery);
    else url.searchParams.delete("q");
    if (nextCategory && !initialCategory)
      url.searchParams.set("kategori", nextCategory);
    else url.searchParams.delete("kategori");
    // Keep filters shareable without adding a history entry for every keystroke.
    window.history.replaceState(null, "", url);
  }
  const filtered = products.filter(
    (product) =>
      (!category || product.category === category) &&
      normalizeSearch(product.name).includes(normalizeSearch(query)),
  );
  return (
    <section
      className={`catalog-section ${compact ? "compact" : ""}`}
      id="katalog"
      aria-label="Ürün kataloğu"
    >
      <div className="catalog-toolbar">
        <div className="catalog-tabs">
          <button
            className={!category ? "active" : ""}
            onClick={() => update(query, initialCategory)}
          >
            {" "}
            {initialCategory
              ? categories.find((item) => item.slug === initialCategory)?.name
              : "Tüm ürünler"}{" "}
            <span>{initialCategory ? 1 : products.length}</span>
          </button>
          {!initialCategory && (
            <span className="catalog-hint">
              Ekibinizin ihtiyacına göre keşfedin
            </span>
          )}
        </div>
        <div className="catalog-controls">
          {!initialCategory && (
            <>
              <label className="sr-only" htmlFor="category">
                Kategori
              </label>
              <select
                id="category"
                value={category}
                onChange={(event) => update(query, event.target.value)}
              >
                <option value="">Tüm kategoriler</option>
                {categories.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>
            </>
          )}
          <div className="search-field">
            <MagnifyingGlass size={18} />
            <label className="sr-only" htmlFor="product-search">
              Ürün ara
            </label>
            <input
              id="product-search"
              ref={input}
              placeholder="Ürün ara..."
              value={query}
              onChange={(event) => update(event.target.value, category)}
            />
            {query && (
              <button
                aria-label="Aramayı temizle"
                onClick={() => {
                  update("", category);
                  input.current?.focus();
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="result-line" role="status">
        {filtered.length} ürün
        {category && !initialCategory
          ? ` · ${categories.find((item) => item.slug === category)?.name || "Kategori bulunamadı"}`
          : ""}
      </div>
      {filtered.length ? (
        <div className="product-grid">
          {filtered.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <MagnifyingGlass size={32} />
          <h2>Aradığınız ürün bulunamadı.</h2>
          <p>Farklı bir ürün adı deneyin veya filtreleri temizleyin.</p>
          <button
            className="button button-dark"
            onClick={() => update("", initialCategory)}
          >
            Filtreleri temizle <ArrowRight size={17} />
          </button>
        </div>
      )}
    </section>
  );
}
