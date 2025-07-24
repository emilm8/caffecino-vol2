import React, { useEffect, useState } from 'react';
import Cards from './Cards';
import { useTranslation } from 'react-i18next';

export default function Menu() {
  const [data, setData] = useState([])
  const { t, i18n } = useTranslation('landing')
  const loc = i18n.language
    const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    fetchFunc()


    const sections = document.querySelectorAll("h2[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    const handleScroll = () => {
      let current = "";
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function fetchFunc() {
    fetch('https://api.xezernn.com.az/products/category/1')
      .then(res => res.json())
      .then(data => setData(data))
  }


  return (
    <main className='bg-[#f7f7f7] min-h-[88vh]'>
      <section className="sticky top-0 bg-white z-10 p-4 flex gap-4 shadow-md">
        {data.map(item => <a href={`#${item.slug}`} className="nav-link text-gray-500">{item[`name_${loc}`]}</a>)}
      </section>


      <section className="py-6 sm:py-10">
        <div className="p-4 mx-auto max-w-500">

          {
            data?.map((item,index) => (
              <>
                <h2 key={index} id={item.slug} className="text-lg font-bold mb-4 capitalize">{item[`name_${loc}`]}</h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3">
                  {
                    item?.products?.map(elem =>
                      <Cards
                        {...elem} key={elem.id}
                        name={elem[`name_${loc}`]}
                        descripton={elem[`descripton_${loc}`]}
                      />
                    )
                  }
                </div>
              </>

            ))
          }

        </div>
      </section>
    </main>
  )
}
