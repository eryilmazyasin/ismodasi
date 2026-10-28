"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CaretDown, List, X, Phone, WhatsappLogo } from "@phosphor-icons/react";
import { categories, groups } from "@/lib/catalog";
import { phoneHref, whatsappHref } from "@/lib/site";
export default function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const root = useRef<HTMLElement>(null);
  const mobileButton = useRef<HTMLButtonElement>(null);
  const groupButtons = useRef<Record<string, HTMLButtonElement | null>>({});
  useEffect(() => {
    function onPointer(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) {
        setOpen(null);
        setMobile(false);
      }
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        // Close one disclosure at a time so focus never moves into a hidden mobile menu.
        if (open) {
          groupButtons.current[open]?.focus();
          setOpen(null);
        } else if (mobile) {
          mobileButton.current?.focus();
          setMobile(false);
        }
      }
    }
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, mobile]);
  function close() {
    setOpen(null);
    setMobile(false);
  }
  return (
    <header
      ref={root}
      className="site-header"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) close();
      }}
    >
      <div className="utility-bar">
        <div className="container utility-inner">
          <span>Ekibiniz için iş kıyafetleri ve iş güvenliği ürünleri.</span>
          <div className="utility-contact">
            <a href={phoneHref}>
              <Phone size={13} aria-hidden="true" /> 0536 080 1845
            </a>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              <WhatsappLogo size={15} aria-hidden="true" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
      <div className="container header-inner">
        <Link
          href="/"
          onClick={close}
          className="brand"
          aria-label="İş Modası ana sayfa"
        >
          <Image
            src="/images/brand/is-modasi-logo-v2.webp"
            width={960}
            height={244}
            sizes="(max-width: 767px) 212px, (max-width: 1150px) 220px, 240px"
            alt=""
            loading="eager"
          />
        </Link>
        <button
          ref={mobileButton}
          className="mobile-toggle"
          aria-label={mobile ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={mobile}
          aria-controls="main-navigation"
          onClick={() => {
            setMobile(!mobile);
            setOpen(null);
          }}
        >
          {mobile ? <X size={25} /> : <List size={25} />}
        </button>
        <nav
          id="main-navigation"
          aria-label="Ana navigasyon"
          className={mobile ? "main-nav is-open" : "main-nav"}
        >
          <Link href="/urunler" onClick={close} className="all-nav">
            Tüm ürünler
          </Link>
          {groups.map((group, index) => (
            <div className="nav-group" key={group}>
              <button
                ref={(node) => {
                  groupButtons.current[group] = node;
                }}
                onClick={() => setOpen(open === group ? null : group)}
                aria-expanded={open === group}
                aria-controls={`nav-group-${index}`}
              >
                {group}
                <CaretDown size={12} />
              </button>
              <div
                id={`nav-group-${index}`}
                className="nav-dropdown"
                hidden={open !== group}
              >
                {categories
                  .filter((category) => category.group === group)
                  .map((category) => (
                    <Link
                      key={category.slug}
                      href={`/kategori/${category.slug}`}
                      onClick={close}
                    >
                      {category.name}
                    </Link>
                  ))}
              </div>
            </div>
          ))}
          <Link href="/iletisim" onClick={close} className="header-contact">
            İletişime geçin
          </Link>
        </nav>
      </div>
    </header>
  );
}
