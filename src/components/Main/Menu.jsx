import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsByCategory, searchProduct } from "../../api/api";
import Cards from "./Cards";
import { useTranslation } from "react-i18next";

export default function Menu({ searchOpen, onCloseSearch }) {
  const { categoryId } = useParams();
  const [sections, setSections] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const { t, i18n } = useTranslation("landing");
  const loc = i18n.language;

  useEffect(() => {
    (async () => {
      try {
        const data = await getProductsByCategory(categoryId);
        const filteredSections = data.map(sec => ({
          ...sec,
          products: sec.products.filter(p => p.status)
        }));
        setSections(filteredSections);
      } catch (err) {
        console.error("Error loading menu:", err);
      }
    })();
  }, [categoryId]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.length >= 2) {
        searchProduct(query)
          .then(data => {
            const active = (data.products || []).filter(p => p.status);
            setResults(active);
          })
          .catch(err => console.error("Search error:", err));
      } else {
        setResults([]);
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

  // Scroll aktiv link + scrollIntoView
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = document.querySelectorAll("h2[id]");
      let current = "";
      sectionElements.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) {
          current = sec.id;
        }
      });
      document.querySelectorAll(".nav-link").forEach(a => {
        const isActive = a.getAttribute("href") === `#${current}`;
        a.classList.toggle("active", isActive);
        if (isActive) {
          a.scrollIntoView(
            { 
              behavior: "smooth", 
              inline: "center", 
              block: "nearest" 
            });
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  if (searchOpen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center pt-20 bg-black/50 transition-opacity duration-300 ease-out">
        <div className="w-11/12 max-w-md bg-white rounded-xl p-6 shadow-xl transform transition-transform duration-300 ease-out scale-95 animate-[scale-in_0.3s_ease-out_forwards]">
          <input
            autoFocus
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={"Search..."}
            className="w-full p-2 mb-4 border border-[#919660] rounded focus:outline-none focus:ring focus:ring-[#919660]/50 transition-colors duration-200"
          />
          <button
            onClick={() => {
              onCloseSearch();
              setQuery("");
            }}
            className="block w-full mb-6 py-2 bg-[#919660] text-white font-medium rounded hover:bg-[#787144] transition-colors duration-200"
          >
            {"Bağla"}
          </button>
          <div className="grid grid-cols-2 gap-4">
            {results.map(p => (
              <Cards
                key={p.id}
                {...p}
                name={p[`name_${loc}`]}
                description={p[`description_${loc}`]}
              />
            ))}
            {query.length >= 2 && results.length === 0 && (
              <p className="col-span-2 text-center text-gray-500">
                {t("notFound") || "Tapılmadı"}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-[#f7f7f7] min-h-[88vh]">
      <section className="sticky top-0 bg-white z-10 p-4 flex gap-4 overflow-x-auto hide-scrollbar shadow-md">
        {sections.map(sec => (
          <a
            key={sec.slug}
            href={`#${sec.slug}`}
            className="nav-link text-gray-500 text-[12px] whitespace-nowrap hover:text-gray-700 transition-colors duration-200 px-3 py-1.5 rounded-md"
          >
            {sec[`name_${loc}`]}
          </a>
        ))}
      </section>

      <section className="py-6 sm:py-10 transition-opacity duration-300">
        <div className="p-4 mx-auto max-w-500">
          {sections.map(sec => (
            <div key={sec.slug}>
              <h2 id={sec.slug} className="text-lg font-bold mb-4 capitalize">
                {sec[`name_${loc}`]}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                {sec.products.map(prod => (
                  <Cards
                    key={prod.id}
                    {...prod}
                    name={prod[`name_${loc}`]}
                    description={prod[`description_${loc}`]}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
