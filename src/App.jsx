import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  MapPin,
  Menu as MenuIcon,
  Phone,
  Users,
  X,
} from "lucide-react";

const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const navigation = [
  { label: "О ресторане", href: "#about" },
  { label: "Меню", href: "#menu" },
  { label: "Атмосфера", href: "#atmosphere" },
  { label: "Бронирование", href: "#reservation" },
  { label: "Контакты", href: "#contacts" },
];

const menuSections = {
  "Еда": [
    { name: "Смэшбургер S / M / L", price: "850 / 950 / 1 150 ₽" },
    { name: "Чикенбургер", price: "950 ₽" },
    { name: "Спайси смэшбургер", price: "1 200 ₽" },
    { name: "Фишбургер", price: "1 200 ₽" },
    { name: "Чикен санрайз", price: "1 000 ₽" },
    { name: "Фалафель смэш", price: "950 ₽" },
    { name: "Микс салата", price: "500 ₽" },
    { name: "Корн рибс", price: "700 ₽" },
    { name: "Сырные палочки", price: "700 ₽" },
    { name: "Криспи креветки", price: "800 ₽" },
    { name: "Рифлёный фри", price: "600 ₽" },
    { name: "Батат фри", price: "650 ₽" },
    { name: "Чизи фрайс", price: "750 ₽" },
    { name: "Куриные байтсы", price: "750 ₽" },
    { name: "Классика", price: "850 ₽" },
    { name: "Чиз-дог", price: "850 ₽" },
    { name: "Хумус-боул", price: "900 ₽" },
    { name: "Зелёный", price: "900 ₽" },
    { name: "Цезарь", price: "950 ₽" },
    { name: "С креветками и апельсином", price: "1 200 ₽" },
    { name: "Мак & чиз", price: "650 ₽" },
    { name: "Чикен карри", price: "850 ₽" },
    { name: "Лазанья", price: "850 ₽" },
    { name: "Стейк с фри", price: "1 200 ₽" },
    { name: "Куриный бульон", price: "400 ₽" },
    { name: "Куриный бульон с грудкой", price: "550 ₽" },
    { name: "Томатный гаспачо", price: "550 ₽" },
    { name: "Клубничный гаспачо", price: "650 ₽" },
  ],
  "Завтраки": [
    { name: "Авокадо тост", price: "850 ₽" },
    { name: "Утренний бургер", price: "950 ₽" },
    { name: "Домашние сырники", price: "650 ₽" },
    { name: "Криспи чикен вафля с мороженым", price: "850 ₽" },
    { name: "Свити вафля", price: "800 ₽" },
    { name: "Завтрак в отеле", price: "1 200 ₽" },
    { name: "Бекон мелт", price: "950 ₽" },
    { name: "Туна мелт", price: "750 ₽" },
    { name: "Черничные панкейки", price: "800 ₽" },
    { name: "Панкейки с беконом", price: "800 ₽" },
  ],
  "Кофе и чай": [
    { name: "Фильтр 300 мл", price: "400 ₽" },
    { name: "Эспрессо 40 мл", price: "290 ₽" },
    { name: "Американо 200 мл", price: "290 ₽" },
    { name: "Капучино 200 / 300 мл", price: "400 / 450 ₽" },
    { name: "Латте 300 мл", price: "450 ₽" },
    { name: "Флэт уайт 200 мл", price: "450 ₽" },
    { name: "Матча-латте 500 мл", price: "550 ₽" },
    { name: "Чёрный 500 мл", price: "550 ₽" },
    { name: "Зелёный 500 мл", price: "550 ₽" },
    { name: "Травяной 500 мл", price: "550 ₽" },
  ],
  "Безалкогольные": [
    { name: "Вода Saint Spring Reserve 330 / 750 мл", price: "350 / 650 ₽" },
    { name: "Вода Borjomi 330 / 750 мл", price: "400 / 700 ₽" },
    { name: "Coca-Cola 330 мл", price: "500 ₽" },
    { name: "Тоник The Gardenist 200 мл", price: "450 ₽" },
    { name: "Ванильный 300 мл", price: "600 ₽" },
    { name: "Шоколадный 300 мл", price: "600 ₽" },
    { name: "Манго-шейк 300 мл", price: "700 ₽" },
    { name: "Протеиновый 300 мл", price: "700 ₽" },
    { name: "Гамми кола 300 мл", price: "420 ₽" },
    { name: "Ромашка-фейхоа 300 мл", price: "420 ₽" },
    { name: "Маракуйя-грейпфрут 300 мл", price: "420 ₽" },
    { name: "Личи-чай 300 мл", price: "550 ₽" },
    { name: "Какао-лайм 300 мл", price: "650 ₽" },
    { name: "Пинк матча 300 мл", price: "650 ₽" },
    { name: "Эспрессо / матча-тоник", price: "650 ₽" },
    { name: "Эспрессо / матча-бамбл", price: "750 ₽" },
    { name: "Апельсин 350 мл", price: "600 ₽" },
    { name: "Грейпфрут 350 мл", price: "600 ₽" },
    { name: "Яблоко 350 мл", price: "600 ₽" },
  ],
  "Бар": [
    { name: "Stiegl Weisse 200 / 400 мл", price: "400 / 800 ₽" },
    { name: "Schlitz Pils 200 / 400 мл", price: "250 / 500 ₽" },
    { name: "Corona Extra 330 мл", price: "650 ₽" },
    { name: "Estrella Free Damm 330 мл", price: "650 ₽" },
    { name: "Петнат 125 / 750 мл", price: "700 / 4 200 ₽" },
  ],
};

const benefits = [
  {
    index: "01",
    title: "Авторская кухня",
    text: "Знакомые вкусы, собранные по-новому — точно, легко и без лишней сложности.",
  },
  {
    index: "02",
    title: "Светлый интерьер",
    text: "Воздух, натуральные фактуры и выразительные детали, в которых приятно задержаться.",
  },
  {
    index: "03",
    title: "Тёплая простота",
    text: "Внимательный сервис и атмосфера без пафоса — легко зайти на завтрак, ужин или встречу.",
  },
];

const atmospherePhotos = [
  {
    src: asset("photos/inside_the_restaurant.webp"),
    label: "Интерьер",
    className: "atmosphere-card atmosphere-card--interior",
  },
  {
    src: asset("photos/food5.webp"),
    label: "Подача",
    className: "atmosphere-card atmosphere-card--dessert",
  },
  {
    src: asset("photos/food10.webp"),
    label: "Детали",
    className: "atmosphere-card atmosphere-card--details",
  },
  {
    src: asset("photos/food2.webp"),
    label: "Зал",
    className: "atmosphere-card atmosphere-card--evening",
  },
];

function BrandMark({ compact = false }) {
  return (
    <a className={`brand ${compact ? "brand--compact" : ""}`} href="#top" aria-label="Jnkl — на главную">
      Jnkl
    </a>
  );
}

function ArrowIcon() {
  return <ArrowRight aria-hidden="true" size={17} strokeWidth={1.6} />;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen);
    return () => document.body.classList.remove("menu-is-open");
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
      <div className="site-header__inner">
        <BrandMark compact />
        <nav className="desktop-nav" aria-label="Основная навигация">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="header-booking" href="#reservation">
          Столик
          <ArrowIcon />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>
      <div className={`mobile-nav ${menuOpen ? "mobile-nav--open" : ""}`} aria-hidden={!menuOpen}>
        <nav aria-label="Мобильная навигация">
          {navigation.map((item, index) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mobile-nav__meta">
          <p>Усачева ул., 15А, Москва</p>
          <p>Ежедневно · 09:00—23:00</p>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const visualRef = useRef(null);

  useEffect(() => {
    const visual = visualRef.current;
    if (!visual || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const onScroll = () => {
      const offset = Math.min(window.scrollY * 0.08, 52);
      visual.style.setProperty("--hero-shift", `${offset}px`);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero__topline" aria-hidden="true">
        <span>55.7276° N</span>
        <span>Москва · Хамовники</span>
        <span>37.5628° E</span>
      </div>
      <div className="hero__grid">
        <div className="hero__copy">
          <h1>
            Ресторан
            <em> на Усачева</em>
          </h1>
          <p className="hero__description">
            Понятная еда, светлый зал и спокойный ритм для завтраков, встреч и длинных ужинов.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#menu">
              Посмотреть меню
              <ArrowIcon />
            </a>
            <a className="button button--ghost" href="#reservation">
              Забронировать стол
            </a>
          </div>
        </div>
        <div className="hero__visual" ref={visualRef}>
          <div className="hero__image-wrap">
            <img
              src={asset("photos/food3.webp")}
              alt="Фирменный бургер Jnkl в руках гостя"
              width="855"
              height="1280"
              fetchPriority="high"
            />
          </div>
          <div className="hero__seal" aria-hidden="true">
            <span>Jnkl</span>
            <small>Usacheva 15A</small>
          </div>
        </div>
      </div>
      <a className="hero__scroll" href="#about" aria-label="Перейти к разделу о ресторане">
        <ArrowDown size={17} />
        <span>Узнать больше</span>
      </a>
    </section>
  );
}

function About() {
  return (
    <section className="about section" id="about">
      <div className="section-label reveal">
        <span>01</span>
        <span>О ресторане</span>
      </div>
      <div className="about__intro reveal">
        <p className="about__lead">
          Jnkl — это ресторан для тех, кто ценит <em>вкус, эстетику и атмосферу.</em>
        </p>
        <div className="about__body">
          <p>
            Мы соединяем современную подачу, спокойный интерьер и внимательный сервис, чтобы
            каждый визит ощущался как маленькое событие.
          </p>
          <a className="text-link" href="#atmosphere">
            Почувствовать атмосферу <ArrowIcon />
          </a>
        </div>
      </div>
      <div className="about__media reveal">
        <div className="about__image about__image--large">
          <img src={asset("photos/inside_the_restaurant.webp")} alt="Светлый интерьер ресторана Jnkl" loading="lazy" />
        </div>
        <div className="about__image about__image--small">
          <img src={asset("photos/food10.webp")} alt="Открытая кухня и детали ресторана" loading="lazy" />
        </div>
        <p className="about__caption">Усачева, 15А · место для встреч и длинных разговоров</p>
      </div>
      <div className="benefit-list">
        {benefits.map((benefit) => (
          <article className="benefit reveal" key={benefit.index}>
            <span>{benefit.index}</span>
            <h3>{benefit.title}</h3>
            <p>{benefit.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function MenuSection() {
  const [activeSection, setActiveSection] = useState("Еда");

  return (
    <section className="menu-section section" id="menu">
      <div className="section-label section-label--light reveal">
        <span>02</span>
        <span>Меню</span>
      </div>
      <div className="menu-section__heading reveal">
        <h2>
          Базовое меню
          <em> без лишнего шума</em>
        </h2>
        <p>Основные разделы собраны компактно: выбирайте категорию и смотрите актуальные позиции с ценами.</p>
      </div>
      <div className="menu-layout reveal">
        <div className="menu-tabs" role="tablist" aria-label="Разделы меню">
          {Object.keys(menuSections).map((section, index) => (
            <button
              key={section}
              className={activeSection === section ? "is-active" : ""}
              type="button"
              role="tab"
              aria-selected={activeSection === section}
              onClick={() => setActiveSection(section)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {section}
            </button>
          ))}
        </div>
        <div className="menu-dishes" role="tabpanel" aria-live="polite">
          <div className="menu-dishes__title">
            <span>Сейчас в меню</span>
            <h3>{activeSection}</h3>
          </div>
          <div className="dish-list" key={activeSection}>
            {menuSections[activeSection].map(({ name, price }, index) => (
              <div className="dish" key={name} style={{ "--dish-delay": `${index * 45}ms` }}>
                <span className="dish__index">{String(index + 1).padStart(2, "0")}</span>
                <span className="dish__name">{name}</span>
                <span className="dish__line" aria-hidden="true" />
                <span className="dish__price">{price}</span>
              </div>
            ))}
          </div>
          <p className="menu-note">Меню и состав блюд могут меняться в зависимости от сезона.</p>
        </div>
        <figure className="menu-photo">
          <img src={asset("photos/food.webp")} alt="Блюдо с зелёным соусом из меню Jnkl" loading="lazy" />
          <figcaption>
            <span>Chef’s choice</span>
            <span>Летнее меню · 2026</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Atmosphere() {
  return (
    <section className="atmosphere section" id="atmosphere">
      <div className="section-label reveal">
        <span>03</span>
        <span>Атмосфера</span>
      </div>
      <div className="atmosphere__title reveal">
        <h2>Атмосфера, в которую легко встроить день.</h2>
        <p>
          Светлый зал, детали интерьера и несколько кадров изнутри Jnkl — без лишних подписей поверх фото.
        </p>
      </div>
      <div className="atmosphere-grid">
        {atmospherePhotos.map((item, index) => (
          <figure className={`${item.className} reveal`} key={item.label}>
            <div className="atmosphere-card__image">
              <img src={item.src} alt={`${item.label} Jnkl`} loading="lazy" />
            </div>
            <figcaption>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span>{item.label}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="atmosphere-strip reveal" aria-label="Дополнительные фотографии Jnkl">
        {["food4.webp", "food6.webp", "food7.webp", "food8.webp", "burger.webp"].map((photo) => (
          <img src={asset(`photos/${photo}`)} alt="" loading="lazy" key={photo} />
        ))}
      </div>
    </section>
  );
}

function Reservation() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="reservation section" id="reservation">
      <div className="reservation__intro reveal">
        <div className="section-label section-label--light">
          <span>04</span>
          <span>Бронирование</span>
        </div>
        <h2>
          Ваш стол
          <em> уже ждёт</em>
        </h2>
        <p>
          Оставьте заявку — мы свяжемся с вами, чтобы подтвердить бронирование и уточнить детали.
        </p>
        <div className="reservation__contact">
          <Phone size={17} strokeWidth={1.5} />
          <a href="tel:+79990000000">+7 (999) 000-00-00</a>
        </div>
      </div>
      <div className="reservation__form-wrap reveal">
        {submitted ? (
          <div className="success-message" role="status">
            <span className="success-message__icon">
              <Check size={28} strokeWidth={1.5} />
            </span>
            <p>Спасибо</p>
            <h3>Заявка принята</h3>
            <span>Скоро мы позвоним вам, чтобы подтвердить стол.</span>
            <button type="button" className="text-link" onClick={() => setSubmitted(false)}>
              Новая заявка <ArrowIcon />
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <label className="form-field form-field--wide">
              <span>Имя</span>
              <input type="text" name="name" placeholder="Как к вам обращаться?" autoComplete="name" required />
            </label>
            <label className="form-field form-field--wide">
              <span>Телефон</span>
              <input
                type="tel"
                name="phone"
                placeholder="+7 (___) ___-__-__"
                autoComplete="tel"
                required
              />
            </label>
            <label className="form-field">
              <span>
                <CalendarDays size={15} /> Дата
              </span>
              <input type="date" name="date" required />
            </label>
            <label className="form-field">
              <span>
                <Clock3 size={15} /> Время
              </span>
              <input type="time" name="time" min="09:00" max="22:30" required />
            </label>
            <label className="form-field form-field--wide">
              <span>
                <Users size={15} /> Количество гостей
              </span>
              <select name="guests" defaultValue="2" required>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((count) => (
                  <option value={count} key={count}>
                    {count} {count === 1 ? "гость" : count < 5 ? "гостя" : "гостей"}
                  </option>
                ))}
              </select>
            </label>
            <button className="button button--cream form-submit" type="submit">
              Забронировать стол
              <ArrowIcon />
            </button>
            <p className="form-privacy">Нажимая кнопку, вы соглашаетесь на обработку данных.</p>
          </form>
        )}
      </div>
    </section>
  );
}

function Location() {
  return (
    <section className="location section" id="contacts">
      <div className="section-label reveal">
        <span>05</span>
        <span>Контакты</span>
      </div>
      <div className="location__layout">
        <div className="location__copy reveal">
          <h2>Контакты</h2>
          <address>Усачева ул., 15А</address>
          <div className="location__details">
            <p>
              <Clock3 size={17} />
              <span>
                <small>Время работы</small>
                Ежедневно с 09:00 до 23:00
              </span>
            </p>
            <p>
              <Phone size={17} />
              <span>
                <small>Телефон</small>
                <a href="tel:+79990000000">+7 (999) 000-00-00</a>
              </span>
            </p>
          </div>
          <a
            className="button button--primary"
            href="https://yandex.ru/maps/?text=%D0%A3%D1%81%D0%B0%D1%87%D1%91%D0%B2%D0%B0%20%D1%83%D0%BB.%2C%2015%D0%90%2C%20%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0"
            target="_blank"
            rel="noreferrer"
          >
            <MapPin size={17} strokeWidth={1.6} />
            Открыть на карте
          </a>
        </div>
        <div className="location__note reveal">
          <MapPin size={20} strokeWidth={1.5} />
          <p>Москва, район Хамовники. Адрес и маршрут доступны по кнопке «Открыть на карте».</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <BrandMark />
        <p>Современный ресторан<br />на улице Усачева</p>
        <div>
          <p>Усачева ул., 15А, Москва</p>
          <p>Ежедневно с 09:00 до 23:00</p>
        </div>
      </div>
      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Jnkl</p>
        <nav aria-label="Социальные сети">
          <a href="#instagram" aria-label="Instagram Jnkl">Instagram</a>
          <a href="#telegram" aria-label="Telegram Jnkl">Telegram</a>
          <a href="https://yandex.ru/maps/?text=%D0%A3%D1%81%D0%B0%D1%87%D1%91%D0%B2%D0%B0%2015%D0%90" target="_blank" rel="noreferrer">
            Maps
          </a>
        </nav>
        <a href="#top">Наверх ↑</a>
      </div>
    </footer>
  );
}

function RevealObserver() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}

export default function App() {
  return (
    <>
      <RevealObserver />
      <Header />
      <main>
        <Hero />
        <About />
        <MenuSection />
        <Atmosphere />
        <Reservation />
        <Location />
      </main>
      <Footer />
    </>
  );
}
