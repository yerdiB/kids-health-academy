import { useMemo, useState } from 'react';
import {
  Activity, ArrowRight, Baby, BookOpen, CheckCircle2, ChevronDown, Clock3,
  Heart, Menu, Search, ShieldCheck, Sparkles, Stethoscope, X,
} from 'lucide-react';

type Category = 'Барлығы' | 'Денсаулық' | 'Тамақтану' | 'Ұйқы' | 'Даму' | 'Алғашқы көмек';
type Article = { id: number; category: Exclude<Category, 'Барлығы'>; title: string; excerpt: string; age: string; read: string; image: string; color: string; featured?: boolean };

const categories: { name: Category; icon: React.ReactNode; count: number }[] = [
  { name: 'Барлығы', icon: <BookOpen size={17}/>, count: 24 },
  { name: 'Денсаулық', icon: <Heart size={17}/>, count: 8 },
  { name: 'Тамақтану', icon: <Activity size={17}/>, count: 5 },
  { name: 'Ұйқы', icon: <Sparkles size={17}/>, count: 4 },
  { name: 'Даму', icon: <Baby size={17}/>, count: 4 },
  { name: 'Алғашқы көмек', icon: <ShieldCheck size={17}/>, count: 3 },
];

const articles: Article[] = [
  { id: 1, category: 'Денсаулық', title: 'Баланың қызуы көтерілсе не істеу керек?', excerpt: 'Дене қызуын дұрыс өлшеу, баланың жағдайын бақылау және дәрігерге қашан жүгіну керегін біліңіз.', age: '0–12 жас', read: '6 мин', image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=85', color: 'mint', featured: true },
  { id: 2, category: 'Тамақтану', title: 'Қосымша тамақтандыруды неден бастау керек?', excerpt: 'Алғашқы тағамдар, қауіпсіз консистенция және баланың дайындық белгілері туралы.', age: '6–12 ай', read: '8 мин', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=85', color: 'peach' },
  { id: 3, category: 'Ұйқы', title: 'Сәбидің ұйқы режимін қалай қалыптастыруға болады?', excerpt: 'Жас ерекшелігіне сай ұйқы қажеттілігі мен тыныш кешкі әдеттер.', age: '0–3 жас', read: '5 мин', image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=900&q=85', color: 'lavender' },
  { id: 4, category: 'Даму', title: 'Баланың сөйлеу дамуы: маңызды кезеңдер', excerpt: 'Сөйлеудің алғашқы белгілері және баламен күнделікті қарым-қатынасты дамыту жолдары.', age: '1–4 жас', read: '7 мин', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=85', color: 'blue' },
  { id: 5, category: 'Алғашқы көмек', title: 'Үй жағдайындағы қауіпсіздік: ата-анаға нұсқаулық', excerpt: 'Жиі кездесетін тұрмыстық қауіптердің алдын алу және шұғыл жағдайда әрекет ету.', age: 'Барлық жас', read: '9 мин', image: 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?auto=format&fit=crop&w=900&q=85', color: 'peach' },
  { id: 6, category: 'Денсаулық', title: 'Профилактикалық тексерулер не үшін қажет?', excerpt: 'Баланың өсуі мен дамуын жүйелі бақылаудың маңызы.', age: '0–18 жас', read: '4 мин', image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=900&q=85', color: 'mint' },
];

function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('Барлығы');
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const visibleArticles = useMemo(() => articles.filter((article) =>
    (activeCategory === 'Барлығы' || article.category === activeCategory) &&
    `${article.title} ${article.excerpt} ${article.category}`.toLowerCase().includes(query.toLowerCase())
  ), [activeCategory, query]);

  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMobileOpen(false); };

  return <div className="site-shell">
    <div className="topline"><span><span className="top-dot"/> Ата-аналарға арналған сенімді білім платформасы</span><span className="top-right">Бала денсаулығы — басты құндылық <Heart size={13} fill="currentColor"/></span></div>
    <header className="header">
      <a className="brand" href="#home" onClick={(e) => { e.preventDefault(); scrollTo('home'); }}>
        <span className="brand-mark"><PlusMark/></span><span className="brand-copy"><strong>kids health<span> academy</span></strong><small>БАЛА ДЕНСАУЛЫҒЫ ЖӘНЕ ДАМУЫ</small></span>
      </a>
      <nav className={mobileOpen ? 'nav nav-open' : 'nav'}>
        <a className="nav-link active" href="#home" onClick={(e)=>{e.preventDefault();scrollTo('home')}}>Басты бет</a>
        <a className="nav-link" href="#articles" onClick={(e)=>{e.preventDefault();scrollTo('articles')}}>Мақалалар</a>
        <a className="nav-link" href="#categories" onClick={(e)=>{e.preventDefault();scrollTo('categories')}}>Санаттар</a>
        <a className="nav-link" href="#about" onClick={(e)=>{e.preventDefault();scrollTo('about')}}>Біз туралы</a>
        <button className="mobile-close" onClick={()=>setMobileOpen(false)} aria-label="Мәзірді жабу"><X/></button>
      </nav>
      <div className="header-actions"><button className="search-shortcut" onClick={()=>scrollTo('articles')}><Search size={17}/><span>Іздеу</span></button><button className="header-cta" onClick={()=>scrollTo('newsletter')}>Жаңалықтарға жазылу <ArrowRight size={15}/></button></div>
      <button className="menu-toggle" aria-label="Мәзірді ашу" onClick={()=>setMobileOpen(true)}><Menu/></button>
    </header>

    <main id="home">
      <section className="hero container">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-icon"><Sparkles size={14}/></span> САНАЛЫ АТА-АНАЛЫҚҚА БІР ҚАДАМ ЖАҚЫН</div>
          <h1>Балаңыздың денсаулығы — <em>біздің</em> ортақ қамқорлығымыз.</h1>
          <p className="hero-description">Бала денсаулығы, дұрыс тамақтануы, ұйқысы мен дамуы туралы пайдалы әрі түсінікті ақпарат. Сенімді білім — сенімді ата-ана.</p>
          <div className="hero-buttons"><button className="primary-btn" onClick={()=>scrollTo('articles')}>Мақалаларды оқу <ArrowRight size={17}/></button><button className="text-btn" onClick={()=>scrollTo('categories')}>Санаттарды қарау <ChevronDown size={16}/></button></div>
          <div className="hero-proof"><div className="proof-avatars"><span>А</span><span>М</span><span>Д</span><span>+</span></div><div><strong>Ата-аналарға арналған</strong><small>Түсінікті. Пайдалы. Жанашыр.</small></div><div className="proof-divider"/><div className="proof-rating"><span>★★★★★</span><small>Білімге негізделген контент</small></div></div>
        </div>
        <div className="hero-visual">
          <div className="hero-blob"/>
          <img className="hero-image" src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1100&q=90" alt="Баласымен бірге уақыт өткізіп отырған ата-ана"/>
          <div className="floating-card growth-card"><span className="float-icon green"><Activity size={17}/></span><div><strong>Дені сау өсу</strong><small>Әр кезең маңызды</small></div><CheckCircle2 className="float-check" size={17}/></div>
          <div className="floating-card care-card"><span className="float-icon pink"><Heart size={17}/></span><div><strong>Мейірім мен қамқорлық</strong><small>Балаға ең керегі</small></div></div>
          <div className="hero-sparkle sparkle-one">✳</div><div className="hero-sparkle sparkle-two">✦</div>
          <div className="image-caption"><span className="caption-line"/> ӘР БАЛА — ЕРЕКШЕ ӘЛЕМ</div>
        </div>
      </section>

      <section className="trust-strip"><div className="container trust-inner"><div><ShieldCheck/><span><strong>Сенімді ақпарат</strong><small>Дәлелді дереккөздерге сүйенеміз</small></span></div><div><Stethoscope/><span><strong>Маман кеңестері</strong><small>Медициналық сараптамаға басымдық</small></span></div><div><Heart/><span><strong>Ата-анаға қолдау</strong><small>Күнделікті өмірге пайдалы білім</small></span></div><div><BookOpen/><span><strong>Қарапайым тіл</strong><small>Күрделі тақырыптар түсінікті түрде</small></span></div></div></section>

      <section className="section container" id="categories">
        <div className="section-heading"><div><div className="eyebrow">БІЛІМ ӘЛЕМІНЕ САЯХАТ</div><h2>Нені білгіңіз келеді?</h2><p>Балаңыздың әр даму кезеңіне қажетті ақпаратты таңдаңыз.</p></div><button className="outline-btn" onClick={()=>scrollTo('articles')}>Барлық мақалалар <ArrowRight size={16}/></button></div>
        <div className="category-grid">{categories.slice(1).map((category, index)=><button key={category.name} className={`category-card category-${index}`} onClick={()=>{setActiveCategory(category.name);scrollTo('articles')}}><span className="category-icon">{category.icon}</span><span className="category-title">{category.name}</span><span className="category-count">{category.count} мақала <ArrowRight size={14}/></span></button>)}</div>
      </section>

      <section className="articles-section" id="articles"><div className="container section">
        <div className="section-heading article-heading"><div><div className="eyebrow">ПАЙДАЛЫ АҚПАРАТ</div><h2>Соңғы мақалалар</h2><p>Ата-аналар үшін маңызды тақырыптар мен сараптамалық материалдар.</p></div><div className="article-search"><Search size={17}/><input aria-label="Мақалаларды іздеу" placeholder="Мақаланы іздеу..." value={query} onChange={e=>setQuery(e.target.value)}/>{query && <button onClick={()=>setQuery('')} aria-label="Іздеуді тазалау"><X size={15}/></button>}</div></div>
        <div className="filter-row">{categories.map(category=><button key={category.name} className={activeCategory===category.name?'filter-chip selected':'filter-chip'} onClick={()=>setActiveCategory(category.name)}>{category.name}</button>)}</div>
        <div className="article-grid">{visibleArticles.map(article=><article className="article-card" key={article.id} onClick={()=>setSelectedArticle(article)} tabIndex={0} onKeyDown={e=>e.key==='Enter'&&setSelectedArticle(article)}><div className="article-image-wrap"><img src={article.image} alt=""/><span className={`article-tag ${article.color}`}>{article.category}</span><button className="save-btn" aria-label="Мақаланы ашу"><ArrowRight size={17}/></button></div><div className="article-body"><div className="article-meta"><span>{article.age}</span><span className="meta-dot"/><span><Clock3 size={13}/> {article.read}</span></div><h3>{article.title}</h3><p>{article.excerpt}</p><button className="read-link" onClick={(e)=>{e.stopPropagation();setSelectedArticle(article)}}>Толығырақ оқу <ArrowRight size={15}/></button></div></article>)}</div>
        {visibleArticles.length===0&&<div className="empty-state"><Search size={28}/><strong>Мақала табылмады</strong><span>Іздеу сөзін немесе санатты өзгертіп көріңіз.</span><button className="text-btn" onClick={()=>{setQuery('');setActiveCategory('Барлығы')}}>Сүзгілерді тазалау</button></div>}
        <div className="all-articles-wrap"><button className="outline-btn" onClick={()=>{setActiveCategory('Барлығы');setQuery('')}}>Барлық мақалаларды көру <ArrowRight size={16}/></button></div>
      </div></section>

      <section className="about-section container" id="about"><div className="about-illustration"><div className="about-circle"><div className="about-inner"><Heart size={52}/><span>care<br/>with knowledge</span></div></div><span className="about-deco deco-a">✳</span><span className="about-deco deco-b">✦</span><div className="about-note"><ShieldCheck size={18}/><span><strong>Білімге негізделген</strong><small>Ақпарат пен қамқорлық</small></span></div></div><div className="about-copy"><div className="eyebrow">БІЗДІҢ МАҚСАТЫМЫЗ</div><h2>Әр ата-ана сенімді ақпаратқа лайық.</h2><p>Kids Health Academy — ата-аналарға бала денсаулығы мен дамуы туралы ақпаратты түсінікті тілде ұсынуға арналған білім беру платформасы.</p><p>Біз ата-ананың саналы шешім қабылдауына көмектесетін пайдалы материалдар жинақтаймыз. Ақпарат медициналық мамандардың тексеруінен өтуі тиіс.</p><div className="about-points"><span><CheckCircle2/> Түсінікті материалдар</span><span><CheckCircle2/> Жас ерекшелігіне сай тақырыптар</span><span><CheckCircle2/> Жауапты ақпарат тарату</span></div></div></section>

      <section className="newsletter-section" id="newsletter"><div className="container newsletter-inner"><div><div className="eyebrow light">БІЗБЕН БІРГЕ ӨСІҢІЗ</div><h2>Пайдалы білім поштаңызда болсын.</h2><p>Жаңа мақалалар мен ата-аналарға арналған пайдалы кеңестерді алып отырыңыз.</p></div><form className="newsletter-form" onSubmit={e=>{e.preventDefault();if(email.includes('@'))setSubscribed(true)}}><div className="email-field"><input type="email" placeholder="Электрондық поштаңыз" value={email} onChange={e=>{setEmail(e.target.value);setSubscribed(false)}} required/><button type="submit" aria-label="Жазылу"><ArrowRight/></button></div><small>{subscribed?'Рақмет! Жазылымыңыз қабылданды.':'Спам жібермейміз. Кез келген уақытта жазылымнан бас тарта аласыз.'}</small></form><div className="newsletter-decoration">✳</div></div></section>
    </main>

    <footer className="footer"><div className="container footer-main"><a className="brand footer-brand" href="#home"><span className="brand-mark"><PlusMark/></span><span className="brand-copy"><strong>kids health<span> academy</span></strong><small>БАЛА ДЕНСАУЛЫҒЫ ЖӘНЕ ДАМУЫ</small></span></a><p>Балаңыздың жарқын болашағы үшін<br/>сенімді білім мен қамқорлық.</p><div className="footer-links"><a href="#home">Басты бет</a><a href="#articles">Мақалалар</a><a href="#categories">Санаттар</a><a href="#about">Біз туралы</a></div></div><div className="container footer-bottom"><span>© 2026 Kids Health Academy. Барлық құқықтар қорғалған.</span><span className="disclaimer">Ақпарат дәрігер кеңесін алмастырмайды.</span></div></footer>

    {selectedArticle&&<div className="modal-backdrop" role="presentation" onClick={()=>setSelectedArticle(null)}><div className="article-modal" role="dialog" aria-modal="true" aria-label={selectedArticle.title} onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setSelectedArticle(null)} aria-label="Жабу"><X/></button><img src={selectedArticle.image} alt=""/><div className="modal-content"><span className="article-tag mint">{selectedArticle.category}</span><div className="article-meta"><span>{selectedArticle.age}</span><span className="meta-dot"/><span><Clock3 size={13}/> {selectedArticle.read}</span></div><h2>{selectedArticle.title}</h2><p>{selectedArticle.excerpt}</p><div className="medical-note"><ShieldCheck size={19}/><span><strong>Маңызды ескерту</strong><br/>Бұл материал жалпы ақпараттық мақсатта берілген. Балаңыздың жағдайына қатысты сұрақтар бойынша педиатрға жүгініңіз. Шұғыл белгілер байқалса, жедел медициналық көмек шақырыңыз.</span></div><p className="modal-placeholder">Бұл мақаланың толық нұсқасы редакциялық контент дайындалғаннан кейін жарияланады.</p></div></div></div>}
  </div>;
}

function PlusMark(){return <svg viewBox="0 0 40 40" aria-hidden="true"><rect x="2" y="2" width="36" height="36" rx="12" fill="currentColor" opacity=".12"/><path d="M20 10v20M10 20h20" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg>}

export default App;
