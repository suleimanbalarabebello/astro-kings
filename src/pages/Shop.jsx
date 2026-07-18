/* Shop.jsx — the football shop: items sold at the centre.
   Simple listing (no online checkout) — items are bought at reception.
   TODO: client to supply real product photos, prices, sizes and stock info. */

import { I } from '../lib/icons.jsx';
import { Glass, Btn, Tag, Placeholder, PageHead } from '../components/ui.jsx';
import { Footer } from '../components/Nav.jsx';

/* TODO: replace placeholder prices/products with the centre's real range */
const PRODUCTS = [
  { name:'Match football',            price:'£15', tag:'',            desc:'Size 4 & 5 · training and match quality.' },
  { name:'Grip socks',                price:'£8',  tag:'best seller', desc:'Anti-slip grip socks — all sizes.' },
  { name:'Notts Olympic home kit',    price:'£35', tag:'club',        desc:'Official Notts Olympic FC shirt, shorts & socks.' },
  { name:'Notts Olympic training top',price:'£25', tag:'club',        desc:'Club training wear — adults & juniors.' },
  { name:'Shin pads',                 price:'£10', tag:'',            desc:'Junior and adult sizes.' },
  { name:'Water bottle',              price:'£5',  tag:'',            desc:'750ml squeeze bottle.' },
];

export function Shop(){
  return (
    <div>
      <PageHead eyebrow="the football shop" title="kit up at the centre"
        sub="Footballs, grip socks, Notts Olympic kits and training wear — available to buy at reception every day we’re open." />

      <section className="mx-auto mt-12 max-w-6xl px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p,i)=>(
            <Glass key={p.name} className="flex flex-col overflow-hidden rounded-3xl fade-up" style={{animationDelay:(i*.05)+'s'}}>
              {/* TODO: real product photo */}
              <Placeholder label={p.name} className="aspect-[4/3] w-full" />
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="text-[16px] font-medium">{p.name}</div>
                  {p.tag ? <Tag accent={p.tag==='best seller'}>{p.tag}</Tag> : null}
                </div>
                <p className="mt-1.5 flex-1 text-[13.5px] leading-relaxed text-white/55">{p.desc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="tnum text-xl font-semibold accent-text">{p.price}</span>
                  <span className="text-[12px] text-white/45">buy at reception</span>
                </div>
              </div>
            </Glass>
          ))}
        </div>

        <Glass strong className="mt-10 flex flex-col items-center gap-4 rounded-[30px] p-8 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <div className="text-[18px] font-medium lowercase">need club kit in a specific size?</div>
            <p className="mt-1 text-[14px] text-white/55">Ask at reception or get in touch — we can order Notts Olympic kits and training wear in.</p>
          </div>
          <a href="#contact" className="shrink-0"><Btn kind="primary" iconEnd={I.arrow({})}>contact us</Btn></a>
        </Glass>
      </section>
      <Footer />
    </div>
  );
}
