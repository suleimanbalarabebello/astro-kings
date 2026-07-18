/* Contact.jsx — contact us: centre details, map, opening hours, general enquiry */

import { I } from '../lib/icons.jsx';
import { CONTACT } from '../lib/data.js';
import { Glass, PageHead } from '../components/ui.jsx';
import { EnquiryForm } from '../components/Enquiry.jsx';
import { Map } from '../components/Map.jsx';
import { Footer } from '../components/Nav.jsx';

export function Contact(){
  return (
    <div>
      <PageHead eyebrow="get in touch" title="contact us"
        sub="Questions about bookings, parties, events, coaching or the club — call, email, or drop us a message and we’ll get back to you." />

      <div className="mx-auto mt-12 grid max-w-6xl gap-6 px-6 lg:grid-cols-[1fr_380px]">
        {/* enquiry form */}
        <Glass strong className="rounded-[30px] p-8">
          <h2 className="text-2xl font-medium lowercase">send us a message</h2>
          <p className="mt-2 text-[14px] text-white/55">General enquiries — we usually reply within one working day.</p>
          <div className="mt-6">
            <EnquiryForm cta="send message" placeholder="How can we help?" />
          </div>
        </Glass>

        {/* details + hours + map */}
        <aside className="space-y-4">
          <Glass className="rounded-3xl p-6">
            <div className="text-[12px] uppercase tracking-wide text-white/45">visit us</div>
            <ul className="mt-4 space-y-3 text-[14px] text-white/70">
              <li className="flex items-start gap-2.5"><span className="mt-0.5 text-white/40" style={{width:17,height:17}}>{I.pin({})}</span><a href={CONTACT.maps} target="_blank" rel="noreferrer" className="hover:text-white">{CONTACT.addr}</a></li>
              <li className="flex items-center gap-2.5"><span className="accent-text">●</span><a href={'tel:'+CONTACT.phone.replace(/\s/g,'')} className="hover:text-white">{CONTACT.phone}</a></li>
              <li className="flex items-center gap-2.5"><span className="accent-text">●</span><a href={'mailto:'+CONTACT.email} className="hover:text-white">{CONTACT.email}</a></li>
            </ul>
          </Glass>
          <Glass className="rounded-3xl p-6">
            <div className="text-[12px] uppercase tracking-wide text-white/45">opening hours</div>
            <div className="mt-4 space-y-2 text-[14px] text-white/75">
              <div className="flex justify-between"><span>Mon – Fri</span><span className="tnum text-white/60">08:00 – 22:00</span></div>
              <div className="flex justify-between"><span>Sat – Sun</span><span className="tnum text-white/60">08:00 – 20:00</span></div>
            </div>
          </Glass>
          <div className="aspect-square w-full overflow-hidden rounded-3xl glass">
            <Map className="h-full w-full" />
          </div>
        </aside>
      </div>
      <Footer />
    </div>
  );
}
