import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

// ─── DATA ───────────────────────────────────────────────────────────────────

const APT1_PHOTOS = [
  {
    url: "https://cdn.poehali.dev/projects/4dda1b7e-cd6d-48fa-82ef-4b9e9a2d6556/bucket/76f81b12-fb28-4a8d-9afc-7006bf134503.jpeg",
    caption: "Спальня с авторским декором",
  },
  {
    url: "https://cdn.poehali.dev/projects/4dda1b7e-cd6d-48fa-82ef-4b9e9a2d6556/bucket/c6efb576-da14-4c94-8452-a9f2165306cd.jpeg",
    caption: "Уютная комната с балконом",
  },
  {
    url: "https://cdn.poehali.dev/projects/4dda1b7e-cd6d-48fa-82ef-4b9e9a2d6556/bucket/01bc42c6-ca1e-4d83-9ffe-3e9325f20fc7.jpeg",
    caption: "Балкон с видом на Милан",
  },
  {
    url: "https://cdn.poehali.dev/projects/4dda1b7e-cd6d-48fa-82ef-4b9e9a2d6556/bucket/ec3ad8f1-b236-4c20-91d4-c6aec4a34498.jpeg",
    caption: "Стильная ванная комната",
  },
  {
    url: "https://cdn.poehali.dev/projects/4dda1b7e-cd6d-48fa-82ef-4b9e9a2d6556/bucket/24550202-138b-4fe1-af6e-1e325bb70e7c.jpeg",
    caption: "Мраморная ванная с душем",
  },
];

const APT2_PHOTOS = [
  {
    url: "https://cdn.poehali.dev/projects/4dda1b7e-cd6d-48fa-82ef-4b9e9a2d6556/bucket/779bf69a-a026-422d-886f-b373c224c8c0.jpeg",
    caption: "Спальня с авангардным искусством",
  },
  {
    url: "https://cdn.poehali.dev/projects/4dda1b7e-cd6d-48fa-82ef-4b9e9a2d6556/bucket/e8958d24-a8b8-432a-9c31-f3640d423a3a.jpeg",
    caption: "Хрустальная люстра и канделябры",
  },
  {
    url: "https://cdn.poehali.dev/projects/4dda1b7e-cd6d-48fa-82ef-4b9e9a2d6556/bucket/ce32371f-1f64-4d1b-9a2a-72fac6f7dd6c.jpeg",
    caption: "Просторная спальня с люстрой",
  },
  {
    url: "https://cdn.poehali.dev/projects/4dda1b7e-cd6d-48fa-82ef-4b9e9a2d6556/bucket/4580cb5a-dc62-4de5-b9c9-cb06273dd992.jpeg",
    caption: "Бордовая комната — 2 кровати",
  },
  {
    url: "https://cdn.poehali.dev/projects/4dda1b7e-cd6d-48fa-82ef-4b9e9a2d6556/bucket/dcf7a838-7f0d-4af8-bc6a-e3e9a8e17449.jpeg",
    caption: "Роскошный интерьер с тропическим панно",
  },
];

const AMENITIES = [
  { icon: "Wifi", label: "Wi-Fi" },
  { icon: "Wind", label: "Кондиционер" },
  { icon: "Tv", label: "Smart TV" },
  { icon: "WashingMachine", label: "Стиралка" },
  { icon: "Coffee", label: "Кофемашина" },
  { icon: "ChefHat", label: "Кухня" },
  { icon: "Bath", label: "Ванная" },
  { icon: "Car", label: "Парковка" },
];

const REVIEWS = [
  {
    name: "Olga Barlet",
    flag: "🇷🇺",
    rating: 5,
    text: "Неделя пролетела незаметно — настолько было комфортно и уютно. Очень чисто, спокойно и по-домашнему тепло. Видно, что хозяева относятся к своему делу с душой. С радостью остановимся снова!",
    apt: "Апартаменты №2",
  },
  {
    name: "Tasty Tour",
    flag: "🇬🇪",
    rating: 5,
    text: "Нас было четверо: 2 взрослых и 2 ребёнка — квартира стала идеальным домом. Изолированные спальни, идеальный ремонт, чистота. Лидия всё придумала до мелочей. До Дуомо всего 20 минут. Будем возвращаться ❤️",
    apt: "Апартаменты №2",
  },
  {
    name: "Светлана Лисова",
    flag: "🇷🇺",
    rating: 5,
    text: "Очень классная квартира во всех отношениях! Шикарные кровати, большая ванная, полностью обустроенная кухня. Лидия очень приветливая и рассказала о жизни в Милане во всех подробностях. Искренне рекомендую!",
    apt: "Апартаменты №2",
  },
  {
    name: "Vadim Yankovyi",
    flag: "🇺🇦",
    rating: 5,
    text: "Супер квартира! Просторная, безупречно чистая, 2 балкона. Лидия — потрясающая хозяйка, помогла спланировать экскурсии на неделю. До метро 5 минут, уезжали на озеро Комо. Уверенно рекомендую!",
    apt: "Апартаменты №2",
  },
];

const LANDMARKS = [
  { name: "Дуомо ди Милано", dist: "12 мин", emoji: "⛪" },
  { name: "Галерея Витторио Эмануэле", dist: "14 мин", emoji: "🏛️" },
  { name: "Ла Скала", dist: "15 мин", emoji: "🎭" },
  { name: "Брера", dist: "8 мин", emoji: "🎨" },
  { name: "Castello Sforzesco", dist: "18 мин", emoji: "🏰" },
  { name: "Metro M2 Loreto", dist: "3 мин", emoji: "🚇" },
];

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

function PhotoCarousel({ photos }: { photos: typeof APT1_PHOTOS }) {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + photos.length) % photos.length);
  const next = () => setActive((a) => (a + 1) % photos.length);

  return (
    <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-stone-100 group">
      {photos.map((p, i) => (
        <img
          key={i}
          src={p.url}
          alt={p.caption}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <p className="absolute bottom-4 left-4 right-16 text-white text-sm font-medium">
        {photos[active].caption}
      </p>
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full w-9 h-9 flex items-center justify-center transition-all"
      >
        <Icon name="ChevronLeft" size={18} />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full w-9 h-9 flex items-center justify-center transition-all"
      >
        <Icon name="ChevronRight" size={18} />
      </button>
      <div className="absolute bottom-4 right-4 flex gap-1">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              i === active ? "bg-white w-4" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function StarRating({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} className="text-amber-400 text-sm">★</span>
      ))}
    </div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [galleryPhoto, setGalleryPhoto] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const allPhotos = [...APT1_PHOTOS, ...APT2_PHOTOS];

  return (
    <div className="min-h-screen bg-[#fdf8f3] font-body text-[#2a1f1a]">
      {/* ── NAV ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#fdf8f3]/95 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2">
            <span className="text-xl font-display font-bold text-[#8B1a1a]">Milano</span>
            <span className="text-xl font-display font-light text-[#c9913a]">Casa</span>
          </button>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#5a4a40]">
            {[["apartments", "Квартиры"], ["gallery", "Галерея"], ["reviews", "Отзывы"], ["map", "Карта"], ["contacts", "Контакты"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="hover:text-[#c9913a] transition-colors">
                {label}
              </button>
            ))}
          </div>
          <button
            onClick={() => scrollTo("contacts")}
            className="hidden md:block bg-[#8B1a1a] hover:bg-[#6d1414] text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors"
          >
            Забронировать
          </button>
          <button className="md:hidden text-[#2a1f1a]" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#fdf8f3] border-t border-stone-200 px-6 py-4 flex flex-col gap-4 text-sm font-medium text-[#5a4a40]">
            {[["apartments", "Квартиры"], ["gallery", "Галерея"], ["reviews", "Отзывы"], ["map", "Карта"], ["contacts", "Контакты"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left hover:text-[#c9913a] transition-colors">
                {label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contacts")}
              className="bg-[#8B1a1a] text-white text-sm font-medium px-5 py-2.5 rounded-full text-center"
            >
              Забронировать
            </button>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://cdn.poehali.dev/projects/4dda1b7e-cd6d-48fa-82ef-4b9e9a2d6556/bucket/76f81b12-fb28-4a8d-9afc-7006bf134503.jpeg"
            alt="Milano Casa"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[#fdf8f3]" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto pt-24">
          <p className="text-[#f5c97e] font-display text-lg tracking-[0.25em] uppercase mb-4">
            Milano · Italia
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Почувствуй Милан<br />
            <span className="text-[#f5c97e]">как дома</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl mb-10 leading-relaxed">
            Две уникальные квартиры с авторским дизайном<br className="hidden md:block" /> в самом сердце города моды
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollTo("apartments")}
              className="bg-[#8B1a1a] hover:bg-[#6d1414] text-white font-semibold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg"
            >
              Смотреть квартиры
            </button>
            <button
              onClick={() => scrollTo("contacts")}
              className="bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-full border border-white/30 transition-all"
            >
              Написать нам
            </button>
          </div>
          <div className="mt-14 flex items-center justify-center gap-8 text-white/70 text-sm">
            <div className="flex items-center gap-2"><span className="text-amber-400">★★★★★</span><span>4.9 рейтинг</span></div>
            <div className="w-px h-4 bg-white/30" />
            <div className="flex items-center gap-2"><Icon name="MapPin" size={14} className="text-[#f5c97e]" /><span>Loreto, Milano</span></div>
            <div className="w-px h-4 bg-white/30" />
            <div className="flex items-center gap-2"><Icon name="Home" size={14} className="text-[#f5c97e]" /><span>2 апартамента</span></div>
          </div>
        </div>
        <button
          onClick={() => scrollTo("apartments")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce"
        >
          <Icon name="ChevronDown" size={28} />
        </button>
      </section>

      {/* ── APARTMENTS ── */}
      <section id="apartments" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#c9913a] font-display tracking-widest uppercase text-sm mb-3">Наши апартаменты</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#2a1f1a]">Два уникальных интерьера</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* APT 1 */}
          <div className="group">
            <PhotoCarousel photos={APT1_PHOTOS} />
            <div className="mt-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-display text-2xl font-bold text-[#2a1f1a]">Апартаменты №1</h3>
                  <p className="text-[#8a7060] text-sm mt-1 flex items-center gap-1">
                    <Icon name="MapPin" size={13} />
                    Via Padova, Loreto · Milano
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[#8B1a1a] font-bold text-xl">от 85€</p>
                  <p className="text-[#8a7060] text-xs">/ ночь</p>
                </div>
              </div>
              <p className="text-[#5a4a40] text-sm leading-relaxed mb-4">
                Светлые и уютные апартаменты с золотыми акцентами, янтарными шторами и балконом с цветами. 
                Стильная мраморная ванная с душем-дождём. Идеально для пар и небольших компаний.
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {["2 спальни", "До 4 гостей", "Балкон", "55 м²"].map(tag => (
                  <span key={tag} className="bg-amber-50 text-[#8B5e2a] text-xs px-3 py-1 rounded-full border border-amber-200">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => scrollTo("contacts")}
                  className="flex-1 bg-[#8B1a1a] hover:bg-[#6d1414] text-white font-semibold py-3 rounded-xl transition-all hover:shadow-lg"
                >
                  Забронировать
                </button>
                <a
                  href="https://airbnb.com/h/fortunamilan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-3 rounded-xl border-2 border-[#FF5A5F] text-[#FF5A5F] hover:bg-[#FF5A5F] hover:text-white font-semibold text-sm transition-all"
                >
                  <Icon name="ExternalLink" size={15} />
                  Airbnb
                </a>
              </div>
            </div>
          </div>

          {/* APT 2 */}
          <div className="group">
            <PhotoCarousel photos={APT2_PHOTOS} />
            <div className="mt-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-display text-2xl font-bold text-[#2a1f1a]">Апартаменты №2</h3>
                  <p className="text-[#8a7060] text-sm mt-1 flex items-center gap-1">
                    <Icon name="MapPin" size={13} />
                    Via Padova, Loreto · Milano
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[#8B1a1a] font-bold text-xl">от 95€</p>
                  <p className="text-[#8a7060] text-xs">/ ночь</p>
                </div>
              </div>
              <p className="text-[#5a4a40] text-sm leading-relaxed mb-4">
                Роскошные апартаменты в духе итальянской классики: синий бархат, золотые канделябры, 
                бордовая комната с тропическим панно. Авангардное искусство на стенах создаёт уникальную атмосферу.
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {["2 спальни", "До 5 гостей", "Паркет ёлочка", "65 м²"].map(tag => (
                  <span key={tag} className="bg-amber-50 text-[#8B5e2a] text-xs px-3 py-1 rounded-full border border-amber-200">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => scrollTo("contacts")}
                  className="flex-1 bg-[#8B1a1a] hover:bg-[#6d1414] text-white font-semibold py-3 rounded-xl transition-all hover:shadow-lg"
                >
                  Забронировать
                </button>
                <a
                  href="https://airbnb.com/h/crystalmilan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-3 rounded-xl border-2 border-[#FF5A5F] text-[#FF5A5F] hover:bg-[#FF5A5F] hover:text-white font-semibold text-sm transition-all"
                >
                  <Icon name="ExternalLink" size={15} />
                  Airbnb
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* AMENITIES */}
        <div className="mt-20 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-stone-100">
          <h3 className="font-display text-2xl font-bold text-center mb-8 text-[#2a1f1a]">Что включено</h3>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
            {AMENITIES.map(({ icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 text-center">
                <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center">
                  <Icon name={icon} size={20} className="text-[#c9913a]" />
                </div>
                <span className="text-xs text-[#5a4a40] font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="py-24 bg-[#f5ede3] px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#c9913a] font-display tracking-widest uppercase text-sm mb-3">Фотогалерея</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#2a1f1a]">Загляните внутрь</h2>
          </div>
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            {allPhotos.map((p, i) => (
              <div
                key={i}
                className="break-inside-avoid cursor-pointer overflow-hidden rounded-xl group"
                onClick={() => setGalleryPhoto(p.url)}
              >
                <img
                  src={p.url}
                  alt={p.caption}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {galleryPhoto && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setGalleryPhoto(null)}
        >
          <img src={galleryPhoto} alt="" className="max-w-full max-h-full rounded-xl object-contain" />
          <button className="absolute top-4 right-4 text-white bg-white/10 rounded-full p-2 hover:bg-white/20 transition-colors">
            <Icon name="X" size={24} />
          </button>
        </div>
      )}

      {/* ── REVIEWS ── */}
      <section id="reviews" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#c9913a] font-display tracking-widest uppercase text-sm mb-3">Отзывы гостей</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#2a1f1a]">Что говорят гости</h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex text-amber-400 text-xl">★★★★★</div>
            <span className="font-bold text-[#2a1f1a] text-lg">4.9</span>
            <span className="text-[#8a7060]">· Airbnb + Booking</span>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {REVIEWS.map((r, i) => (
            <div key={i} className="bg-white rounded-2xl p-7 shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-200 to-orange-200 flex items-center justify-center text-xl">
                    {r.flag}
                  </div>
                  <div>
                    <p className="font-semibold text-[#2a1f1a]">{r.name}</p>
                    <p className="text-xs text-[#8a7060]">{r.apt}</p>
                  </div>
                </div>
                <StarRating n={r.rating} />
              </div>
              <p className="text-[#5a4a40] text-sm leading-relaxed italic">"{r.text}"</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <a
            href="https://maps.app.goo.gl/LFhDGeCby1iDi5Vs8"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border-2 border-stone-200 hover:border-[#c9913a] text-[#5a4a40] hover:text-[#8B1a1a] font-semibold px-6 py-3 rounded-full transition-all text-sm"
          >
            <Icon name="Star" size={16} className="text-[#c9913a]" />
            Все отзывы — Апартаменты №1
          </a>
          <a
            href="https://maps.app.goo.gl/pvbhxaqgABALCSRF7"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border-2 border-stone-200 hover:border-[#c9913a] text-[#5a4a40] hover:text-[#8B1a1a] font-semibold px-6 py-3 rounded-full transition-all text-sm"
          >
            <Icon name="Star" size={16} className="text-[#c9913a]" />
            Все отзывы — Апартаменты №2
          </a>
        </div>
      </section>

      {/* ── MAP ── */}
      <section id="map" className="py-24 bg-[#f5ede3] px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#c9913a] font-display tracking-widest uppercase text-sm mb-3">Расположение</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#2a1f1a]">В сердце Милана</h2>
            <p className="text-[#8a7060] mt-3">Loreto, Via Padova · рядом с метро M1 и M2</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="rounded-2xl overflow-hidden shadow-lg" style={{ height: 420 }}>
              <iframe
                title="Milano Casa Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2796.5!2d9.2221!3d45.4816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c6b6f0d6e0b7%3A0x0!2sVia%20Padova%2C%20Milano%2C%20Italy!5e0!3m2!1sru!2sit!4v1700000000000!5m2!1sru!2sit"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-[#2a1f1a] mb-5">Поблизости</h3>
              <div className="grid grid-cols-1 gap-3">
                {LANDMARKS.map((lm) => (
                  <div key={lm.name} className="flex items-center justify-between bg-white rounded-xl px-5 py-3.5 shadow-sm border border-stone-100">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{lm.emoji}</span>
                      <span className="text-sm font-medium text-[#2a1f1a]">{lm.name}</span>
                    </div>
                    <span className="text-xs text-[#c9913a] font-semibold bg-amber-50 px-3 py-1 rounded-full">
                      {lm.dist}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACTS ── */}
      <section id="contacts" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#c9913a] font-display tracking-widest uppercase text-sm mb-3">Бронирование</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#2a1f1a]">Свяжитесь с нами</h2>
            <p className="text-[#8a7060] mt-3 text-lg">Мы ответим в течение нескольких часов</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100">
              <h3 className="font-display text-xl font-bold text-[#2a1f1a] mb-6">Написать нам</h3>
              <div className="flex flex-col gap-4">
                <input
                  className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#c9913a] transition-colors bg-[#fdf8f3] placeholder:text-stone-400"
                  placeholder="Ваше имя"
                />
                <input
                  className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#c9913a] transition-colors bg-[#fdf8f3] placeholder:text-stone-400"
                  placeholder="Email или телефон"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="date"
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#c9913a] transition-colors bg-[#fdf8f3] text-[#5a4a40]"
                  />
                  <input
                    type="date"
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#c9913a] transition-colors bg-[#fdf8f3] text-[#5a4a40]"
                  />
                </div>
                <textarea
                  className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#c9913a] transition-colors bg-[#fdf8f3] placeholder:text-stone-400 resize-none"
                  rows={3}
                  placeholder="Ваш вопрос или пожелания..."
                />
                <button className="w-full bg-[#8B1a1a] hover:bg-[#6d1414] text-white font-semibold py-3.5 rounded-xl transition-all hover:shadow-lg">
                  Отправить запрос
                </button>
                <a
                  href="https://wa.me/393517110016"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5c] text-white font-semibold py-3.5 rounded-xl transition-all hover:shadow-lg"
                >
                  <Icon name="MessageCircle" size={18} />
                  Написать в WhatsApp
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
                <p className="text-xs font-semibold text-[#8a7060] uppercase tracking-widest mb-4">Контакты</p>
                <div className="flex flex-col gap-4">
                  {[
                    { icon: "MessageCircle", label: "WhatsApp", value: "+39 351 711 0016", href: "https://wa.me/393517110016" },
                    { icon: "Mail", label: "Email", value: "info@milanocasa.it", href: "mailto:info@milanocasa.it" },
                    { icon: "Instagram", label: "Instagram", value: "@milanocasa", href: "https://instagram.com/milanocasa" },
                    { icon: "MapPin", label: "Адрес", value: "Via Padova, Milano, Italy", href: "https://maps.google.com/?q=Via+Padova+Milano" },
                  ].map(({ icon, label, value, href }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                      <div className="w-9 h-9 bg-amber-50 group-hover:bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                        <Icon name={icon} size={16} className="text-[#c9913a]" />
                      </div>
                      <div>
                        <p className="text-xs text-[#8a7060]">{label}</p>
                        <p className="text-sm font-semibold text-[#2a1f1a] group-hover:text-[#8B1a1a] transition-colors">{value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#8B1a1a] to-[#6d1414] rounded-2xl p-6 text-white">
                <p className="font-display text-xl font-bold mb-2">Также на платформах</p>
                <p className="text-white/70 text-sm mb-4">Бронируйте напрямую или через</p>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://airbnb.com/h/fortunamilan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-white/15 hover:bg-white/25 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
                  >
                    <span>🏠 Airbnb — Апартаменты №1</span>
                    <Icon name="ExternalLink" size={14} className="opacity-70" />
                  </a>
                  <a
                    href="https://airbnb.com/h/crystalmilan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-white/15 hover:bg-white/25 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
                  >
                    <span>🏠 Airbnb — Апартаменты №2</span>
                    <Icon name="ExternalLink" size={14} className="opacity-70" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#2a1f1a] text-white/60 text-sm py-8 px-6 text-center">
        <p className="font-display text-white text-lg mb-2">
          <span className="text-[#8B1a1a]">Milano</span>{" "}
          <span className="text-[#c9913a]">Casa</span>
        </p>
        <p>© 2024 · Апартаменты в Милане · Via Padova, Loreto</p>
      </footer>
    </div>
  );
}