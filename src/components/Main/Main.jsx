import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getFullCategory } from "../../api/api";

export default function Main() {
  const [categories, setCategories] = useState([]);
  const { t, i18n } = useTranslation("landing");
  const loc = i18n.language;

  useEffect(() => {
    (async () => {
      try {
        const cats = await getFullCategory();
        setCategories(cats.reverse());
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    })();
  }, []);

  return (
    <main className="px-4 md:px-8 py-6 min-h-[90vh]">
      <div className="mb-6">
        <p className="text-xl font-semibold text-gray-800">{t("category")}</p>
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2  gap-4">
        {categories.map((item) => (
          <Link key={item.id} to={`/menu/${item.id}`}>
            <div className="w-full rounded-2xl overflow-hidden relative group">
              <p className="absolute top-0 left-0 text-lg font-bold text-white p-4 z-10">
                {item[`name_${loc}`]}
              </p>
              <img
                src={item.img[0]}
                alt={item[`name_${loc}`]}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-40 transition duration-300" />
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
