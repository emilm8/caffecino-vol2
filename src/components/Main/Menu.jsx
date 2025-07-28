import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Cards from "./Cards";
import { getProductsByCategory } from "../../api/api";

export default function Menu() {
  const { categoryId } = useParams();
  const [sections, setSections] = useState([]);
  const { t, i18n } = useTranslation("landing");
  const loc = i18n.language;

  useEffect(() => {
    async function load() {
      try {
        const data = await getProductsByCategory(categoryId);
        console.log("ProductsByCategory:", data);
        setSections(data);
      } catch (err) {
        console.error("Error loading menu:", err);
      }
    }
    load();
  }, [categoryId]);

  return (
    <main className="bg-[#f7f7f7] min-h-[88vh]">
       
      <section className="sticky top-0 bg-white z-10 p-4 flex gap-4 shadow-md text-nowrap overflow-x-auto hide-scrollbar ">
        {sections.map((sec) => (
          <a
            key={sec.slug}
            href={`#${sec.slug}`} 
            className="nav-link text-gray-500 text-[12px] "
          >
            {sec[`name_${loc}`]}
          </a>
        ))}
      </section>

      
      <section className="py-6 sm:py-10">
        <div className="p-4 mx-auto max-w-500">
          {sections.map((sec) => (
            <div key={sec.slug}>
              <h2
                id={sec.slug}
                className="text-lg font-bold mb-4 capitalize"
              >
                {sec[`name_${loc}`]}
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 mb-4">
                {sec.products.map((prod) => (
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
